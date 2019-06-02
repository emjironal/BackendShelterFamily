var express = require('express');
var router = express.Router();
var db = require('./basedatos').db;
var select = require('./basedatos').select;

/* GET home page. */
router.get('/', function(req, res, next)
{
    db.query("Select r.cedula as cedula, c.nombre as nombre, count(r.cedula) From Reserva r inner join Cliente c on (r.cedula = c.cedula) Group by 1,2 Order by 3 desc;")
        .then(personas=>{
            db.query("Select a.idRefugio as ID , f.nombre as nombre, count(a.idRefugio) as Total From Animal a inner join Refugio f on (a.idRefugio = f.idrefugio) Group by 1,2 Order by 3 desc;")
            .then(usuarios=>{
                db.query("Select r.idRefugio as ID, f.nombre as Nombre, count(r.idRefugio) From Reserva r inner join Refugio f on (r.idRefugio = f.idrefugio) Group by 1,2 Order by 3 desc;")
                .then(ref=>{
                    db.query("Select distinct u.codigodistrito as codigo, d.nombre AS DISTRITO, p.nombre AS PROVINCIA, count(r.idrefugio) AS total From usuario u inner join refugio r on (u.idusuario = r.idrefugio) inner join distrito d on (d.codigo = u.codigodistrito) inner join provincia p on (d.idprovincia = p.idprovincia) Group by 1,2,3 Order by 2 desc;")
                    .then(ubi=>{
                        res.render('administrador', { personas: personas, users:usuarios , ref: ref, ubi: ubi});
                    })
                    .catch(err=>{
                        console.log("Error: ", err);
                        res.render('administrador', {personas: personas, users: usuarios, ref:ref});
                    });
                })
                .catch(err=>{
                    console.log("Error: ", err);
                    res.render('administrador', {personas: personas, users: usuarios});
                });
                
            })
            .catch(err=>{
                console.log("Error: ", err);
                res.render('administrador', {personas: personas});
            });
        })
        .catch(err=>{
            console.log("Error: ", err);
            res.render('administrador', {personas: [], users:[], ref: [],ubi:[] });
        });
});


router.post("/modificar/:index/:id", function(req, res, next)
{
    var name = req.body.name[req.params.index];
    var latitudepos = req.body.latitudepos[req.params.index];
    var longitudepos = req.body.longitudepos[req.params.index];
    var foodtype = req.body.foodtype[req.params.index];
    var open = req.body.open[req.params.index];
    var close = req.body.close[req.params.index];
    var price = req.body.price[req.params.index];
    var codigodistrito = req.body.distrito[req.params.index];
    db.query("update Restaurant set name = '" + name + "', latitudepos = " + latitudepos + ", " +
        "longitudepos = " + longitudepos + ", foodtype = '" + foodtype + "', open = '" + open + "', close = '" + close + "', " +
        "price = '" + price + "', codigodistrito = '" + codigodistrito + "' " +
        "where idrestaurant = " + req.params.id)
    .then(()=>{
        res.redirect('/administrador');
    })
    .catch(err=>{
        console.log("Error: ", err);
        res.redirect('/administrador');
    })
});
router.post("/eliminar/:id", function(req, res, next)
{
    db.query("select eliminarRestaurante(" + req.params.id + ")")
        .then(()=>{
            res.redirect('/administrador');
        })
        .catch(err=>{
            console.log("Error: ", err);
        });
});

router.post("/insertar", function(req, res, next)
{
    res.redirect("/insertarRestaurante");
});

module.exports = router;