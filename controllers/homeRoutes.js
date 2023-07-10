const router =require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        //Get all posts and join with user data and comment data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                // {
                //     model: Comment,
                // }
            ],
        });
        // res.status(200).json(postData);
        // Serialize data so the template can read it
       
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
        console.log(req.session)
        console.log(`hompage all:` + req.session.logged_in)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment
                }
            ],
        });
        const post = postData.get({ plain: true });
        console.log(post)
        console.log(`hompage single:` + req.session)
        console.log(req.session.logged_in)

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      console.log(req.session)
      console.log(`dashboard:` + req.session.logged_in)
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
      console.log(user)
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    console.log(req.session)
    console.log(`homepage login:` + req.session.logged_in)
    if (req.session.logged_in) {
        res.redirect('/dashboard')
        return;
    }
    res.render('login')
});

module.exports = router;