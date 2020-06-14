// utilizing the code (example) provided in module 14

const withAuth = (req, res, next) => {
  if(!req.session.user_id) {
      res.redirect('/login');
  } else {
      next();
  }
};

module.exports = withAuth;