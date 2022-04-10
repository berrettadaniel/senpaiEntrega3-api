//API para los Trabajos que se hacen con cada empresa.

//Por cada empresa y usuario tengo "trabajos".
//Cada trabajo esta en transcurso o terminado.
//Un usuario por empresa, puede tener en transcurso un solo trabajo, el resto deben estar finalizados.
//De ese modo puedo filtrar en servicios.html las tareas que se estan realizando del trabajo que este
// activo para el usuario que esta logueado y la empresa seleccionada.


const express = require('express');
const trabajosRouter = express.Router();

// Requerir autorizacion (auth.middleware)
// DESCOMENTAR LA SIGUIENTE LINEA CUANDO ESTE PROGRAMADO EL "authMiddleware"
// const { authMiddleware } = require("./../middlewares/auth.middleware");


// Informacion "fake"

const trabajos = [          // idTrabajo, idUsuario, idEmpresa, finalizado, fechaInicio, fechaFin
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

trabajosRouter.get("/", (request, response) => {
    let trabajosResultado = []; //Inicializo variable que devuelve la API.
    let terminado = request.query.terminado; //Obtengo parametro de la url.

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
trabajosRouter.get("/:idTrabajo", (request, response) => {
    let trabajoHallado = null; //Inicializo variable que devuelve la API.
    const trabajoId = request.params.idTrabajo; //Obtengo el "id" del trabajo que viene en la url del navegador

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

    //Retorno el trabajo hallado en caso que no haya habido error.
    response.send(trabajoHallado);
});


module.exports = trabajosRouter;
