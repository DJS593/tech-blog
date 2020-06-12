const { User } = require('../models');

const userData = [
  {

    username: 'David',
    email: 'davidstahl@google.com',
    password: '1234'
  },
  {
    
    username: 'Billy',
    email: 'billywilliams@google.com',
    password: '1234'
  },
  {
    
    username: 'Susan',
    email: 'susansmith@google.com',
    password: '1234'
  },
  
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
