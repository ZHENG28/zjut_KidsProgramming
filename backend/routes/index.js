var express = require('express')
var router = express.Router()

router.get('/change', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  if (req.query.flag == 'true') {
    res.send('/2.png')
  } else {
    res.send('/1.png')
  }
})

module.exports = router
