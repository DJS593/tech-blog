// dependencies
const express = require('express');
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');
//const db = require('./models')

// helper functioin
const helpers = require('./utils/helpers');

// handlebars
const exphbs  = require('express-handlebars');
const hbs = exphbs.create({helpers});

// session (connects session to sequelize db) --> authentication
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'secretDJS',
  cookie: {maxAge: 3600},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
 
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
  
 
// access routes and sessions
app.use(session(sess));
app.use(routes);


// connection to db and server; should be on bottom of server.js
// force should be set to false unless I want to drop database
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

