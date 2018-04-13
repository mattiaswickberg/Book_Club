module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.html')
  })

  app.get('/sessionstatus', function (req, res) {
    console.log('Req.user is: ')
    console.log(req.user)
    res.send(req.user)
  })

  app.get('/account', function (req, res) {
    console.log('redirecting to account')
    res.redirect(303, 'http://localhost:3000/#/account')
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