var getList = require('./getListFromKb')

getList('Neil+Gaiman+Neverwhere')
.then(function (data) {
  console.log(data)
})
