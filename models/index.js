const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// need to define the reverse of the prior association definition
Post.belongsTo(User, {
  foreignKey: 'user_id',
})


// model associations for Comment
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});


module.exports = { User, Post, Comment };