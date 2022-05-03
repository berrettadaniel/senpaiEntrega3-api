//API para los Trabajos que se hacen con cada empresa.

//Por cada empresa y usuario tengo "trabajos".
//Cada trabajo esta en transcurso o terminado.
//Un usuario por empresa, puede tener en transcurso un solo trabajo, el resto deben estar finalizados.
//De ese modo puedo filtrar en servicios.html las tareas que se estan realizando del trabajo que este
// activo para el usuario que esta logueado y la empresa seleccionada.


const express = require('express');
const trabajosRouter = express.Router();
const db = require("../configs/db"); // ======>>> NO FUNCIONO
const { Client } = require("pg");

// Requerir autorizacion (auth.middleware)
// DESCOMENTAR LA SIGUIENTE LINEA CUANDO ESTE PROGRAMADO EL "authMiddleware"
// const { authMiddleware } = require("./../middlewares/auth.middleware");


// Informacion "fake"
const trabajosFAKE = [          // idTrabajo, idUsuario, idEmpresa, finalizado, fechaInicio, fechaFin
    {
        idTrabajo: 1,
        idUsuario: 1,
        idEmpresa: 2,
        finalizado: true,
        fechaInicio: '20/01/2022',
        fechaFin: '25/01/2022',
    },
    {
        idTrabajo: 2,
        idUsuario: 2,
        idEmpresa: 1,
        finalizado: true,
        fechaInicio: '15/01/2022',
        fechaFin: '18/01/2022',
    },
    {
        idTrabajo: 3,
        idUsuario: 1,
        idEmpresa: 4,
        finalizado: false,
        fechaInicio: '20/03/2022',
        fechaFin: '',
    },
    {
        idTrabajo: 4,
        idUsuario: 2,
        idEmpresa: 6,
        finalizado: false,
        fechaInicio: '31/03/2022',
        fechaFin: '',
    }
];


//Definir el GET para toda la lista de trabajos o con query param, para filtrarlos por estado terminado o no.
//El atributo en el "trabajo" que devuelve la API es "finalizado" (boolean).
//Para utilizar el query param, debe ser "terminado=true" o "terminado=false".


//API que devuelve todos los trabajos o solo obtiene los que estan finalizados o no
// ?terminado=false o ?terminado=true
trabajosRouter.get("/", async (request, response) => {

    let trabajosResultado = []; //Inicializo variable que devuelve la API.
    let terminado = request.query.terminado; //Obtengo parametro de la url.


    //Conexion a la BD
    const client = new Client();
    await client.connect();

    //Query a la BD
    const responseBD = await client.query('select * from trabajos;');
    const trabajos = responseBD.rows; //Obtengo el array de registros de la query a la BD
                                      //Es lo que inicialmente lo cargaba como un array "hard code" en este router
    await client.end();
    //Cierre de conexion


//    const responseBD = await db.query("select * from trabajos;"); //======>>> NO FUNCIONO
//    const trabajos = responseBD.rows;

    //Si es undefined devuelve todos los trabajos.
    if (terminado == undefined) {
        trabajosResultado = trabajos;
    };

    //Busco los que estan finalizados
    //y los cargo en la variable de resultado.
    if (terminado == "true") {
        trabajos.forEach((trabajo) => {
            if (trabajo.finalizado) {
                trabajosResultado.push(trabajo);
            };
        });
    };

    //Busco los que no estan finalizados
    //y los cargo en la variable de resultado.
    if (terminado == "false") {
        trabajos.forEach((trabajo) => {
            if (!trabajo.finalizado) {
                trabajosResultado.push(trabajo);
            };
        });
    };
    
    response.send(trabajosResultado);
    return;
});



//Definir el GET para un trabajo dado por el id
trabajosRouter.get("/:idTrabajo", async (request, response) => {
    let trabajoHallado = null; //Inicializo variable que devuelve la API.
    const trabajoId = request.params.idTrabajo; //Obtengo el "id" del trabajo que viene en la url del navegador

    //Conexion a la BD
    const client = new Client();
    await client.connect();

    //Query a la BD
    const responseBD = await client.query('select * from trabajos where id=$1;',[trabajoId]);
    trabajoHallado = responseBD.rows[0]; //Obtengo el array de registros de la query a la BD
                                        //Es lo que inicialmente lo cargaba como un array "hard code" en este router
    await client.end();
    //Cierre de conexion
/*    
    //Busco el trabajo correspondiente a ese id
    trabajos.forEach((trabajo) => {
        if (trabajoId == trabajo.idTrabajo) {
            trabajoHallado = trabajo;
        };
    });

    //Si no existe debo dar el error
    if (trabajoHallado == null) {
        response.statusCode = 404;
        response.send({error: "No existe ese codigo de trabjo"});
        return;
    };
*/
    //Retorno el trabajo hallado en caso que no haya habido error.
    response.send(trabajoHallado);
});


module.exports = trabajosRouter;
