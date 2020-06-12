const router = require('express').Router();
const { Comment } = require('../../models');
//const withAuth = require('../utils/auth');


// get Comment data; did not include User or Post data but can do so by using the include method
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id',
      'comment_text'
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

/* module 13 code, but changed to support session in module 14 below */
// post comment data
// router.post('/', (req, res) => {
//   Comment.create({
//     comment_text: req.body.comment_text,
//     user_id: req.body.user_id,
//     post_id: req.body.post_id
//   })
//     .then(dbCommentData => res.json(dbCommentData))
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     });

// });


router.post('/', /*withAuth,*/ (req, res) => {
  // the withAuth just checks that the user is logged in; not required, but good to have
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});



router.delete('/:id', /*withAuth,*/ (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if(!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;