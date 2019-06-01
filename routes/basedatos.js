var bluebird = require('bluebird');
var pgp = require('pg-promise')({
    promiseLib: bluebird
});
const connectionUrl = 'postgres://udvsnbcohpgnls:930772924d8f64ff43d729bf0b4fb4481e583e5a50fa576f0583ea8837c7b85b@ec2-107-20-177-161.compute-1.amazonaws.com:5432/dcup1mbk58r3al?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
//const connectionUrl = 'postgres://postgres:postgres@localhost:5432/shelterfamily';//local
var db = pgp(connectionUrl);

/**
 * Hace un insert en la base de datos
 * @param res respuesta
 * @param table JSONObject: {"nombre": <string>}
 * @param inserts JSONArray: [{"columna": <string>, "valor": <string>, "tipo": <string>}]
 */


function insert(res, table, inserts)
{
    if(inserts != undefined)
    {
        var query = "insert into " + table.nombre + "(" ;
        if(Array.isArray(inserts))
        {
            inserts.forEach(function(value, index)
            {
                query += ""+ value.columna;
                if(index < inserts.length - 1)
                {
                    query += ", ";
                }
            });
        }
        query += ") values ("
        if(Array.isArray(inserts))
        {
            inserts.forEach(function(value, index)
            {
                if (value.columna == "string" || value.columna == "dateTime"){
                    query += "'"+ value.valor +"'";
                } else {
                    query += value.valor;
                }
                if(index < inserts.length - 1)
                {
                    query += ", ";
                }
            });
        }
        query += ")"
        db.query(query)
        .then(()=>
        {
            var result = {"result": true}
            res.send(result);
        })
        .catch(err=>
        {
            var result = {"result": false}
            res.send(result);
            console.log(err);
        });
    }
    else
    {
        var result = {"result": false}
        res.send(result);
    }
}



/**
 * Hace un update en la base de datos
 * @param res respuesta
 * @param table JSONObject: {"nombre": <string>}
 * @param updates JSONArray: [{"columna": <string>, "nuevoValor": <string>}]
 * @param whereObject JSONArray: [{"columna": <string>, "valor": <any>}]
 */


 
function update(res, table, updates, whereObject)
{
    if(updates != undefined)
    {
        var query = "update " + table.nombre + " set ";
        if(Array.isArray(updates))
        {
            updates.forEach(function(value, index)
            {
                query += ""+ value.columna +" = '"+ value.nuevoValor +"'";
                if(index < updates.length - 1)
                {
                    query += ", ";
                }
            });
        }
        if(whereObject != undefined)
        {
            if(Array.isArray(whereObject))
            {
                query += " where "
                whereObject.forEach(function(value, index)
                {
                    query += ""+ value.columna +" = '"+ value.valor +"'";
                    if(index < whereObject.length - 1)
                    {
                        query += ", ";
                    }
                });
            }
        }
        db.query(query)
        .then(()=>
        {
            var result = {"result": true}
            res.send(result);
        })
        .catch(err=>
        {
            var result = {"result": false}
            res.send(result);
            console.log(err);
        });
    }
    else
    {
        var result = {"result": false}
        res.send(result);
    }
}

/**
 * Hace un select en la base de datos
 * @param res respuesta
 * @param table JSONObject: {"nombre": <string>}
 * @param whereObject JSONArray: [{"columna": <string>, "valor": <any>}]
 * @param orderByObject JSONArray: [{"columna": <string>, "forma": <desc o asc>}]
 */
function select(res, table, whereObject, orderByObject)
{
    var query = "select * from " + table.nombre;
    if(whereObject != undefined)
    {
        if(Array.isArray(whereObject))
        {
            query += " where "
            whereObject.forEach(function(value, index)
            {
                query += ""+ value.columna +" = '"+ value.valor +"'";
                if(index < whereObject.length - 1)
                {
                    query += ", ";
                }
            });
        }
    }
    if(orderByObject != undefined)
    {
        if(Array.isArray(orderByObject))
        {
            query += " order by "
            orderByObject.forEach(function(value, index)
            {
                query += ""+ value.columna +" "+ value.forma +"";
                if(index < orderByObject.length - 1)
                {
                    query += ", ";
                }
            });
        }
    }
    db.query(query)
    .then(result=>
    {
        console.log(result);
        res.send(result);
    })
    .catch(err=>
    {
        console.log(err);
        res.send(err);
    });
}

module.exports.select = select;
module.exports.update = update;
module.exports.insert = insert;
module.exports.query = query;