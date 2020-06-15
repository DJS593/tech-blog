
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//GET /api/users ============================================================================
router.get('/', (req,res)=>{
    //Access our User model and run findALL()
    User.findAll({
        attributes: { exclude: ['password'] } //protects the password
    }) //SQL = SELECT * from User
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET /api/users/1 ==========================================================================
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

//POST /api/users/ ==========================================================================
router.post('/', (req,res)=>{
    //expects {username, email and password}
    User.create({
        username: req.body.username,
        email: req.body.email,
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

//Login route============================================================================
router.post('/login', (req,res) => {
    User.findOne({ //expects email and password
        where: {
            email: req.body.email
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

//=====================Logout===============================================================
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

//PUT /api/users/1 ==========================================================================
router.put('/:id', (req,res) => {
    //expects {username, email and password}

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

//DELETE /api/users/1 ==========================================================================
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


//********************test********** */

// // dependencies
// const router = require('express').Router()
// const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');


// // get all users
// router.get('/', (req, res) => {
//   User.findAll({
//     attributes: { exclude: ['password'] }
//   })
//     .then(dbUserData => res.json(dbUserData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


// // get individual user by ID
// router.get('/:id', (req, res) => {
//   User.findOne({
//     attributes: { exclude: ['password'] },
//     where: {
//       id: req.params.id
//     },
//     include: [
//       {
//         model: Post,
//         attributes: [
//           'id',
//           'title',
//           'content',
//           'created_at'
//         ]
//       },
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'created_at'],
//         include: {
//           model: Post,
//           attributes: ['title']
//         }
//       },
//       {
//         model: Post,
//         attributes: ['title'],
//       }
//     ]
//   })
//   .then(dbUserData => {
//     if (!dbUserData) {
//       res.status(404).json({ message: 'No user found with this id' });
//       return;
//     }
//     res.json(dbUserData);
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });


// // create a new user
// router.post('/', (req, res) => {
//   User.create({ 
//     username: req.body.username,
//     password: req.body.password
//   })
//   .then(dbUserData => {
//     // save user data during session
//     req.session.save(() => {
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;
  
//       res.json(dbUserData);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });    


// // to verify a password we can use a GET, but POST is preferred since the data is passed in the req.body versus URL string
// router.post('/login', (req, res) => {
//   console.log("I am here");
//   User.findOne({
//     where: {
//       username: req.body.username
//     }
//   }).then(dbUserData => {
//     if (!dbUserData) {
//       res.status(400).json({ message: 'No user with that username!' });
//       return;
//     }
//     console.log("i am here too");
//     const validPassword = dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: 'Incorrect password!' });
//       return;
//     }
//     req.session.save(() => {
//       // declare session variables
//       req.session.user_id = dbUserData.id;
//       req.session.username = dbUserData.username;
//       req.session.loggedIn = true;

//       res.json({ user: dbUserData, message: 'You are now logged in!' });
//       console.log("is this working")
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });


// // allow user to log out
// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   }
//   else {
//     res.status(404).end();
//   }
// });


// // update a user
// router.put('/:id', (req,res) => {
//   //if req.body has exact key value pair to match the model, you can just req.body instead 
//   User.update(req.body, {
//       where: {
//           id: req.params.id
//       }
//   })
//   .then(dbUserData => {
//       if(!dbUserData[0]) {
//           req.json(404).json({ message: 'No user found with this id' });
//           return;
//       }
//       res.json(dbUserData);
//   })
//   .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//   });
// });


// // delete a user by ID
// router.delete('/:id', /*withAuth,*/ (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// module.exports = router;