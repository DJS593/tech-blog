const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

/* Model Associations */
// user can make many posts
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// a post can only belong to one user
Post.belongsTo(User, {
  foreignKey: 'user_id',
})


// a comment belongs to one user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

// a comment belongs to one post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

// a user can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

// a post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});


module.exports = { User, Post, Comment };