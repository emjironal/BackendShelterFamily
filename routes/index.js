var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next)
{
  var username = req.body.txtUsuario;
  var password = req.body.txtPassword;
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
