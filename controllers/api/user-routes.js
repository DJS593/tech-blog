const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET all posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      // Query configuration
      attributes: ['id', 
                   'post_text',
                   'title',
                   'created_at'
                ],
      // show latest news first
      order: [['created_at', 'DESC']],
      // JOIN to the User table
      include: [
          // comment model -- attaches username to comment 
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
          },
      ]
    }) 
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  
});

// GET a single post by id 
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 
                   'post_text', 
                   'title',
                   'created_at'
                ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// CREATE a new post
router.post('/', withAuth, (req, res) => {
    Post.create({ 
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
});

// UPDATE a post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_text: req.body.post_text
      },
      {
        where: {
          id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE A post 
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
/*

const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// find all users
router.get('/', (req,res)=>{
    //Access our User model and run findALL()
    User.findAll({
        attributes: { exclude: ['password'] } //protects the password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// find a user by ID
router.get('/:id', (req,res)=>{
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No user found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// create a user
router.post('/', (req,res)=>{
    //requires username and password
    User.create({
        username: req.body.username,
        eamil: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// login
router.post('/login', (req,res) => {
    User.findOne({ 
        where: {
            username: req.body.username
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(400).json({ message: 'User not found' });
            return
        }
        //res.json({ user: dbUserData });

        //Verify User
        const validPassword = dbUserData.checkPassword(req.body.password); //checkPassword method is defined in the User.js file 
        if(!validPassword) {
            res.status(400).json({ message: 'Not a valid Password' });
            return
        }
        //res.json({ user: dbUserData, message: 'You are logged in!' });

        req.session.save(() => {
            //declare sesion variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are logged in!' });
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// logout a user
router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      }
      else {
        res.status(404).end();
      }
});


// update a user by ID
router.put('/:id', (req,res) => {

    //if req.body has exact key value pair to match the model, you can just req.body instead 
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            req.json(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

// delete user by ID
router.delete('/:id', (req,res)=>{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({ message: 'No such user found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
});

module.exports = router;

*/