const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const UserComment = require('./userComment');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// User.hasMany(Comment, {
//     through: {
//         model: UserComment,
//     },
//     as: 'comments'
// });

Comment.belongsTo(User, {
    through: {
        model: UserComment,
    },
    as: 'user'
});

module.exports = { User, Post, Comment, UserComment };

