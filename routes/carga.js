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
    var text = req.body.jsonText
    console.log(text)
    try {
        var json = JSON.parse(text)
        console.log(json)
        db.query("SELECT idUsuario FROM Usuario ORDER BY idUsuario DESC LIMIT 1 ")
        .then(max => {
            var id = max[0].idusuario
            console.log(max[0].idusuario)
            json.data.forEach(function(value, index)
                {
                    var insert = "Insert into Usuario (clave, usuario, correo, codigoDistrito, direccionExacta, telefono) values (12345678, "
                    insert +=  "'"+ value.nombre +"', "
                    insert +=  "'"+ value.correo +"', "
                    insert +=  value.distrito +", "
                    insert +=  "'"+ value.direccion +"', "
                    insert +=  value.telefono  + ")"
                    console.log(insert)
                    db.query(insert)
                    .then(response=>{
                        
                        insert = "Insert into refugio (idRefugio, nombre, cuentaBanco, descripcion, horarioInicio, horarioCierre) values ("
                        insert +=  ""+ id +", "
                        insert +=  "'"+ value.nombre +"', "
                        insert +=  value.cuentaB +", "
                        insert +=  "'"+ value.descripcion +"', "
                        insert +=  "'"+ value.horarioI +"', "
                        insert +=  "'"+ value.horarioC +"')"
                        id++
                        console.log(insert)
                        db.query(insert)
                        .then(resposne2=>{
                            res.render('carga');
                        })
                    })
                    .catch(err=>{
                        console.error(err)
                        res.render('carga');
                    })
                });
        })
        .catch(err=>{
            console.error(err)
            res.render('carga');
        })
    } catch(err) {
        console.error(err)
        res.render('carga');
    }
    
});

module.exports = router;