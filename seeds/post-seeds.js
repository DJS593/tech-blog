const { Post } = require('../models');

const postData = [
  {
    title: 'Javascript is fun!',
    post_text: 'Learning javascript can be rewarding!',
    user_id: 1,
  
  },
  {
    title: 'Mysql is a great!',
    post_text: 'A sql database allows a user to query based on relationships.',
    user_id: 2,
  },
  {
    title: 'ORM saves time!',
    post_text: 'ORM can be more efficient than writing a sql query.',
    user_id: 3,
  },
  
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
