// organize the dependencies

//
const express = require('express');
;
const path = require('path');

//
const sequelize = require('./config/connection')

//
const exphbs  = require('express-handlebars');
//const hbs = exphbs.create({ helpers });

// 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


const app = express();
const PORT = process.env.PORT || 3001

// routes are in the controllers folder
const routes = require('./controllers');
 
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// for express-handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});
 
// get the client
const mysql = require('mysql2');
 

// routes and sessions
app.use(session(sess));
app.use(routes);


// connection to db and server; should be on bottom of server.js
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
