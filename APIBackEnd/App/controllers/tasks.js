const express = require('express')
const pg = require('pg')
const routes = express.Router()
const service = require('../Services/postgessql')
routes.use(express.json())

/**
 * metodo para retornar todas las filas de tasks
 */
routes.get('/', (req, res, next) => {

    service.postgres().select("select id, descripcion, TO_CHAR(NOW() :: DATE, 'Mon dd, yyyy') as fecha, prioridad, lista from tasks order by Fecha ASC").then(function (respuesta) {
        //lo que quiero hacer si recibo algo
        console.log(respuesta);
        res.send(respuesta);
        //catch si no recibe nada
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

/**
 * 
 */
routes.get('/:cumplida', (req, res, next) => {

    var filtro = req.params.cumplida
    service.postgres().select("select id, descripcion,  TO_CHAR(NOW() :: DATE, 'Mon dd, yyyy') as fecha, prioridad, lista from tasks where lista = " + filtro+ " order by Fecha ASC").then(function (respuesta) {
        //lo que quiero hacer si recibo algo
        console.log(respuesta);
        res.send(respuesta);
        //catch si no recibe nada
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});
/**
 * Metodo para eliminar una task
 */
routes.delete('/:id', (req, res, next) => {
    var id = req.params.id
    var query = "delete from tasks where id =" + id;
    console.log(query)
    service.postgres().delete("delete from tasks where id =" + id).then(function (respuesta) {
        //lo que quiero hacer si recibo algo
        console.log(respuesta);
        res.send(respuesta);
        //catch si no recibe nada
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

routes.post('/', (req, res, next) => {

    console.log(req.body)
    console.log(req.body.descripcion)
    const task = {
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        prioridad: req.body.prioridad
    };
    console.log(task)
    let proxid
    service.postgres().select("select max(id) from tasks ").then(function (respuesta) {
        //lo que quiero hacer si recibo algo
        console.log(respuesta[0].max);;
        if (respuesta[0].max == null) {
            proxid = 0;
            proxid += 1;
        } else{
            proxid = parseInt(respuesta[0].max)
            proxid += 1;
        }
        console.log(proxid);
        var query = "INSERT INTO tasks (id,descripcion,fecha,prioridad,lista) values (" + proxid + ",'" + task.descripcion + "','" + task.fecha + "','" + task.prioridad + "'," + false + ")"
        console.log(query)
        service.postgres().insert(query).then(function (respuesta) {
            //lo que quiero hacer si recibo algo
            console.log(respuesta);
            res.send(respuesta);
            //catch si no recibe nada<<
        }).catch(function (error) {
            console.log(error);
            res.send(error);
        });
        //catch si no recibe nada
    }).catch(function (error) {
        console.log(error);
    });

});


/**
 * Metodo para cambiar de estado una tarea 
 */
routes.put('/:id', (req, res, next) => {

    var id = req.params.id

    var query = "SELECT lista FROM tasks where id =" + id
    console.log(query)
    service.postgres().select(query).then(function (respuesta) {

        if (respuesta[0].lista == false) {
            var query2 = "UPDATE tasks SET lista =" + true + " where id = " + id;
            service.postgres().update(query2).then(function (respuesta) {
                res.send("cambia a true")
            }).catch(function (error) {
                console.log(error)
                res.send(error)
            });
        } else {
            var query2 = "UPDATE tasks SET lista =" + false + " where id = " + id;
            service.postgres().update(query2).then(function (respuesta) {
                res.send("cambia a false")
            }).catch(function (error) {
                console.log(error)
                res.send(error)
            });
        }
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

module.exports = routes