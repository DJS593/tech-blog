
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// find all users
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

//POST /api/users/ ==========================================================================
router.post('/', (req,res)=>{
    //requires username and password
    User.create({
        username: req.body.username,
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