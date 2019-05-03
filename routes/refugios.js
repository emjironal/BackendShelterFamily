var express = require('express');
var router = express.Router();
var db = require('./basedatos');

router.get('/get', function(req, res, next)
{
    var table = {"nombre": "refugio"}
    db.select(res, table);
});

module.exports = router;