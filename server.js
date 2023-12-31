// import express.js package
const express = require('express');

// import express-session package for cookie
const session = require('express-session');

// import express-handlebars package for Handlebars view engine 
const exphbs = require('express-handlebars');

//Import built-in Node.js package 'path' to resolve path of files that are located on the server; 
const path = require('path');

// Import the connection object
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import routes
const routes = require('./controllers');

const helpers = require('./utils/helpers');

//Initialize an instance of Express.js
const app = express();

// define what port the web server will listen on(or what por the express.js will run on); whatever is in the environment variable PORT, or 3000 if there's nothing there.
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
    secret: 'secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express.json() is a built in middleware function in Express. It parses incoming JSON requests and puts the parsed data in req.body. Without `express.json()`, `req.body` is undefined.  express.json() is a body parser for post request except html post form.
app.use(express.json());

// Sets up the Express app to handle data parsing. it's a body parser for html post form.
app.use(express.urlencoded({ extended: true}));

// Static middleware pointing to the public folder; Using path.join(__dirname, 'public') will create an absolute path, using the directory where app.js is located as the base.
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Connect to the database before starting the Express.js server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, ()=> console.log('Now, listening'));
});

