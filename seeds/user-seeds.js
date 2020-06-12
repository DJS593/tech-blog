const { User } = require('../models');

const userData = [
  {
    user_name: 'David Stahl',
    email: 'davidstahl@google.com',
    password: '1234'
  },
  {
    user_name: 'Billy Williams',
    email: 'billywilliams@google.com',
    password: '1234'
  },
  {
    user_name: 'Susan Smith',
    email: 'susansmith@google.com',
    password: '1234'
  },
  
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
