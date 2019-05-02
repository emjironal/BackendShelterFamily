var express = require('express');
var router = express.Router();
var db = require('./basedatos');

router.get('/get', function(req, res, next)
{
    var table = {"table": "restaurante"}
    var result = db.select(res, table);
});

module.exports = router;