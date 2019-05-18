var express = require('express');
var router = express.Router();
var db = require('./basedatos');

router.get('/get', function(req, res, next)
{
    var table = {"nombre": "refugio"}
    db.select(res, table);
});

router.post('/update', function(req, res, next)
{
    var table = {"nombre": "refugio"}
    var updates = [];
    var idrefugio = [].concat(req.body.idrefugio);
    var columnas = [].concat(req.body.columnas);
    var nuevosValores = [].concat(req.body.nuevosValores);
    var whereColumnas = [].concat(req.body.whereColumnas);
    var whereValores = [].concat(req.body.whereValores);
    for(var i = 0; i < columnas.length; i++)
    {
        var object = {"columna": columnas[i], "nuevoValor": nuevosValores[i]};
        updates.push(object);
    }
    for(var i = 0; i < whereColumnas.length; i++)
    {
        var object = {"columna": columnas[i], "nuevoValor": nuevosValores[i]};
        updates.push(object);
    }
    db.update(res, table, updates);
});

module.exports = router;