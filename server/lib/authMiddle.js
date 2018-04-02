function loggedInOnly(req, res, next) {
  if (req.user) {
    if (req.user.role === 'student' || req.user.role === 'teacher' || req.user.role === 'admin') {
      return next()
    }
  }
  res.redirect(303, '/')
}