module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html')
  })

  app.get('/account', function (req, res) {
    if (!req.user) return res.redirect(303, '/unauthorised')
    res.render('account', {
      username: req.user.name
    })
  })

  // Usual routes
  app.get('/unauthorised',
function (req, res) {
  console.log('403')
  res.status('403').redirect('/')
})

  app.use(function (req, res, next) {
    console.log('404')
    res.status(404)
    res.redirect('/')
  })

  app.use(function (err, req, res, next) {
    console.log('500')
    console.error(err.stack)
    res.status(500)
    res.redirect('/')
  })
}
