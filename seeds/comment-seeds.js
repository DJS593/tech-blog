const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'Completely agree!!',
    user_id: 2,
    post_id: 1,
  
  },
  {
    comment_text: 'Sql can be difficult!',
    user_id: 3,
    post_id: 2
  },
  {
    comment_text: 'I miss writing the queries!',
    user_id: 1,
    post_id: 3
  },
  
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
