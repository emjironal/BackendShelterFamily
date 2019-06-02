var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;
const fetch = require("node-fetch")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('carga', { title: 'Express' });
});

router.post('/load', function(req, res, next)
{
  var route = req.body.jsonFile
  var data = require(route)
  try {
      var json = JSON.parse(data)
  } catch(err) {
    console.error(err)
  }
  fetch(route)
  .then(console.log(route))
  .then(response => response.json())
  .then(jsonResponse => {
    console.log(jsonResponse)
  });
});

module.exports = router;