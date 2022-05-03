//API para Lista de Tareas por cada trabajo.
//Cada trabajo tiene un idTrabajo, entonces en esta API para cada trabajo tenemos:
//      - idTrabajo
//      - fechaTarea
//      - descripcionTarea
//          idTrabajo y fechaTarea serian claves en una tabla de la BD.


const express = require('express');
const tareasRouter = express.Router();
const db = require("../configs/db"); // ======>>> NO FUNCIONO
const { Client } = require("pg");

// Requerir autorizacion (auth.middleware)
// DESCOMENTAR LA SIGUIENTE LINEA CUANDO ESTE PROGRAMADO EL "authMiddleware"
// const { authMiddleware } = require("./../middlewares/auth.middleware");


// Informacion "fake"

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


//Definir el GET para toda la lista de tareas
tareasRouter.get("/", async (request, response) => {
    //Conexion a la BD
    const client = new Client();
    await client.connect();

    //Query a la BD
    const responseBD = await client.query('select * from tareas;');
    const tareas = responseBD.rows; //Obtengo el array de registros de la query a la BD
                                        //Es lo que inicialmente lo cargaba como un array "hard code" en este router
    await client.end();
    //Cierre de conexion
    response.send(tareas);
});


//Definir el GET para la lista de tareas correspondientes a un idTrabajo
//El array vacio no lo considero como un error para considerar en el router, es el caso de
//un trabajo para el que aun no se han registrado tareas.

tareasRouter.get("/:idTrabajo", async (request, response) => {
    const trabajoId = request.params.idTrabajo; //Obtengo el "id" del trabajo que viene en la url del navegador
    //Conexion a la BD
    const client = new Client();
    await client.connect();

    //Query a la BD
    const responseBD = await client.query('select * from tareas where idTrabajo=$1;', [trabajoId]);
    const trabajos = responseBD.rows; //Obtengo el array de registros de la query a la BD
                                      //Es lo que inicialmente lo cargaba como un array "hard code" en este router
    await client.end();
    //Cierre de conexion

    //Retorno la lista de tareas del trabajo hallado
    response.send(trabajos);
});



//Definir el PUT para insertar una tarea
tareasRouter.put("/", async (request, response) => {
    const idTrabajoIns = 2; //Para el obligatorio dejo fijo el trabajo con Id = 2 que es el que esta activo
    //Obtengo el resto de loa parametros que vienen en el body del request
    const fechaIns = request.body.fecha;
    const descripcionIns = request.body.descripcion;
    const idEmpresaIns = request.body.idEmpresa;

    //Conexion a la BD
    const client = new Client();
    await client.connect();

    //Query a la BD
    //  Texto fijo de la query
    const textoInsert = 'insert into tareas (idtrabajo, fecha, descripcion, idempresa) values ($1, $2, $3, $4);';
    //  Ejecuto el cliente con la query y los valores a insertar
    const responseBD = await client.query(textoInsert, [idTrabajoIns, fechaIns, descripcionIns, idEmpresaIns]);
    const trabajos = responseBD.rows;
    await client.end();
    //Cierre de conexion

    response.send(trabajos);
})

module.exports = tareasRouter;
