const { Post } = require('../models');

const postData = [
  {
    title: 'Javascript is fun!',
    content: 'Learning javascript can be rewarding!',
    user_id: 1,
  
  },
  {
    title: 'Mysql is a great!',
    content: 'A sql database allows a user to query based on relationships.',
    user_id: 2,
  },
  {
    title: 'ORM saves time!',
    content: 'ORM can be more efficient than writing a sql query.',
    user_id: 3,
  },
  
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
