// dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');


// rendering all posts to homepage
router.get('/', (req,res)=> {
    Post.findAll({
        attributes: [
          'id', 
          'title', 
          'post_text', 
          'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                  'id', 
                  'comment_text', 
                  'post_id', 
                  'user_id', 
                  'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { 
            posts,
            loggedIn: req.session.loggedIn
         });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// get a single post by id
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
          'id', 
          'title', 
          'post_text', 
          'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                  'id', 
                  'comment_text', 
                  'post_id', 
                  'user_id', 
                  'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]

    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        //serialize the data
        const post = dbPostData.get({ plain: true });

        //pass data to the template
        res.render('single-post', { 
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// redirecting users to homepage once they log in
router.get('/login', (req,res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

// rendering sign up page
router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;