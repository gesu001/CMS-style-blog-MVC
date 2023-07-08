const router =require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        //Get all posts and join with user data and comment data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                }
            ],
        });
        res.status(200).json(postData);
        // // Serialize data so the template can read it
        // const posts = postData.map((post) => post.get({ plain: true }));

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;