const { User } = require('../models');

const userData = [
  {

    username: 'David',
    password: '1234'
   
  },
  {
    
    username: 'Billy',
    password: '1234'
    
  },
  {
    
    username: 'Susan',
    password: '1234'
   
  },
  
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
