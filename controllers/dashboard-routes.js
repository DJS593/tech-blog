
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth.js')


// get all blog posts
router.get('/', withAuth, (req,res) => {
    Post.findAll({
        where: {
            //use the ID from the session
            user_id: req.session.user_id
        },

        attributes: [
          'id', 
          'title',
          'post_text', 
          'created_at'],

        include:[
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['Username']
            }
        ]
    })
    .then(dbPostData => {
      //serialize data before passing it to the template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggeIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// edit a blog post by id
router.get('/edit/:id', withAuth, (req,res) => {
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
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
            res.status(404).json({ message: 'No post found with this id '});
            return
        }
        //serialize the data before passing to template
        const post = dbPostData.get({ plain: true });
        res.render('edit-blog', { 
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

})

module.exports = router;