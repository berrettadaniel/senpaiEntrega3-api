//API para Lista de Tareas por cada trabajo.
//Cada trabajo tiene un idTrabajo, entonces en esta API para cada trabajo tenemos:
//      - idTrabajo
//      - fechaTarea
//      - descripcionTarea
//      - id de la empresa con la que se hace el trabajo


const express = require('express');
const tareasRouter = express.Router();
const db = require("../configs/db"); // ======>>> NO FUNCIONO
const { Client } = require("pg");

// Requerir autorizacion (auth.middleware)
// DESCOMENTAR LA SIGUIENTE LINEA CUANDO ESTE PROGRAMADO EL "authMiddleware"
// const { authMiddleware } = require("./../middlewares/auth.middleware");


// Informacion "fake"
// Este array lo utilizamos mientras no tenemos la BD implementada.
// No deberia dejarlo en el codigo, pero lo guardo a los efectos ilustrativos y a modo de anotaciones a futuro.
const tareasFAKE = [
    {
        idTrabajo: 1,
        fecha: '20/01/2022',
        descripcion: 'Comienzo',
    },
    {
        idTrabajo: 1,
        fecha: '21/01/2022',
        descripcion: 'Tendido de cables',
    },
    {
        idTrabajo: 1,
        fecha: '23/01/2022',
        descripcion: 'Colocar terminales',
    },
    {
        idTrabajo: 1,
        fecha: '25/01/2022',
        descripcion: 'Fin',
    },
    {
        idTrabajo: 2,
        fecha: '15/01/2022',
        descripcion: 'Empieza trab2',
    },
    {
        idTrabajo: 2,
        fecha: '18/01/2022',
        descripcion: 'Termina trab2',
    },
    {
        idTrabajo: 3,
        fecha: '20/03/2022',
        descripcion: 'Arranco',
    },
    {
        idTrabajo: 3,
        fecha: '28/03/2022',
        descripcion: 'Ni novedades',
    },
    {
        idTrabajo: 4,
        fecha: '31/03/2022',
        descripcion: 'Vino a saludar',
    },
];



//EndPoints de la API

// GET para toda la lista de tareas
tareasRouter.get("/", async (request, response) => {
    //Conexion a la BD
    const client = new Client();
    await client.connect();

    //Query a la BD
    const responseBD = await client.query('select * from tareas;');
    const tareas = responseBD.rows; //Obtengo un array con todos los registros de la query a la BD

    await client.end();
    //Cierre de conexion
    response.send(tareas);
});


// GET para la lista de tareas correspondientes a un idTrabajo
//El array vacio no lo considero como un error para considerar en el router, es el caso de
//un trabajo para el que aun no se han registrado tareas.

tareasRouter.get("/:idTrabajo", async (request, response) => {
    const trabajoId = request.params.idTrabajo; //Obtengo el "id" del trabajo que viene en la url del navegador
    //Conexion a la BD
    const client = new Client();
    await client.connect();

    //Query a la BD
    const responseBD = await client.query('select * from tareas where idTrabajo=$1;', [trabajoId]);
    const trabajos = responseBD.rows; //Obtengo un array con todos los registros de la query a la BD

    await client.end();
    //Cierre de conexion

    //Retorno la lista de tareas del trabajo hallado
    response.send(trabajos);
});



// PUT para insertar una tarea
tareasRouter.put("/", async (request, response) => {
    const idTrabajoIns = 2; //Para el obligatorio dejo fijo el trabajo con Id = 2, es el que esta activo

    //Obtengo el resto de loa parametros que vienen en el body del request
    const fechaIns = request.body.fecha;
    const descripcionIns = request.body.descripcion;
    const idEmpresaIns = request.body.idEmpresa;

    //Conexion a la BD 
    const client = new Client();

    try {
        await client.connect();

        //Esto lo hago para mostrar en consola la cantidad de registros que hay antes
        //y los que hay despues del insert, solo para verificar la API por Postman.
        //Lo dejo solo para tenerlo de referencia y ejemplo.
        const responseSelBD = await client.query('select * from tareas where idTrabajo=$1', [idTrabajoIns]);
        console.log('Cant Trabajos Antes: ', responseSelBD.rowCount);

        //Query a la BD para hacer el insert

        //  Texto fijo de la query
        const textoInsert = 'insert into tareas (idtrabajo, fecha, descripcion, idempresa) values ($1, $2, $3, $4);';

        //  Ejecuto el cliente con la query y los valores a insertar
        let responseBD = await client.query(textoInsert, [idTrabajoIns, fechaIns, descripcionIns, idEmpresaIns]);

        //Muestro en consola la cantidad de registros que quedaron en la tabla despues del insert
        responseBD = await client.query('select * from tareas where idTrabajo=$1', [idTrabajoIns]);
        console.log('Cant Trabajos Despues: ', responseBD.rowCount);
        
        await client.end();
        //Cierre de conexion

        response.send('ok');

    } catch (error) {
         response.send({mensaje: "Tarea no agregada"});   
    }
});

module.exports = tareasRouter;
