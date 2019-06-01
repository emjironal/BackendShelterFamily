var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('carga', { title: 'Express' });
});

router.post('/load', function(req, res, next)
{
  var route = req.body.jsonFile;
  $.getJSON(route, function(json){
      console.log(json);
  });
  
  var query = "select * from usuario where usuario = '" + username + "' and clave = '" + password +"'";
  db.query(query)
  .then(result =>
    {
      if(result.length < 1)
      {
        console.log('Result:', 'vacio', ' ', query);
        res.redirect('/');
      }
      else
      {
        console.log('Result:', result[0]);
        res.redirect('/carga');
      }
    }
  )
  .catch(err =>
    {
      console.log('Error: ', err);
      res.redirect('/');
    }
  );
});

module.exports = router;