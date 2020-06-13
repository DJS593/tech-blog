// dependencies
const router = require('express').Router()

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');



// establishing main homepage route
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
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
          'created_at'
        ],
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
      // pass a single object into the homepage template
      res.render('homepage', dbPostData[0].get({ plain: true }));
      console.log(dbPostData[0])
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});





module.exports = router;