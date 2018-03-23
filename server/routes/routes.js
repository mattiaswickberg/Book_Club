// Set routes
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('./views/home')
    })

  app.use(function (req, res, next) {
    res.status(404)
    res.render('403')
  })

  app.use(function (req, res, next) {
    res.status(404)
    res.render('404')
  })

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    res.render('500')
  })
}

