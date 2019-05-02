var bluebird = require('bluebird');
var pgp = require('pg-promise')({
    promiseLib: bluebird
});
const connectionUrl = 'postgres://rcygnhpuisrxld:9b08ad521466ea78f8697fe956e534d9a300d52f0d164f67f4eb0fe80833698f@ec2-54-225-95-183.compute-1.amazonaws.com:5432/d1rqbmoplu7o3p?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
//const connectionUrl = 'postgres://postgres:postgres@localhost:5432/appetyte';//local
var db = pgp(connectionUrl);

/**
 * Hace un select en la base de datos
 * @param res respuesta
 * @param table JSONObject: {"nombre": <string>}
 * @param whereObject JSONArray: [{"columna": <string>, "valor": <any>}]
 * @param orderByObject JSONArray: [{"columna": <string>, "forma": <desc o asc>}]
 */
function select(res, table, whereObject, orderByObject)
{
    var query = "select * from " + table;
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