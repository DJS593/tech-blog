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

// need to use belongsToMany method for many-to-many associations
// User.belongsToMany(Post, {
//   through: Vote,
//   as: 'voted_posts',
//   foreignKey: 'user_id'
// });


// Post.belongsToMany(User, {
//   through: Vote,
//   as: 'voted_posts',
//   foreignKey: 'post_id'
// });



// model associations for Comment
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});





module.exports = { User, Post, Comment };