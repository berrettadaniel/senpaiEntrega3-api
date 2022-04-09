//Idea de TRABAJOS:
//Por cada empresa y usuario tengo "trabajos"
//Cada trabajo esta en transcurso o terminado
//Un usuario por empresa, puede tener en transcurso un solo trabajo, el resto deben estar finalizados.
//De ese modo puedo filtrar en servicios.html las tareas que se estan realizando del trabajo que este activo para el usuario que esta logueado y la empresa seleccionada.



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


//Definir el GET para toda la lista de trabajos
trabajosRouter.get("/", (request, response) => {
    let trabajosResultado = [];
    let terminado = request.query.terminado;

    if (terminado == undefined) {
        response.send(trabajos);
        return;
    };

    if (terminado == true) {
        trabajosResultado.forEach((trabajo) => {
            if (trabajo.finalizado) {
                trabajosResultado.push(trabajo);
            };
        response.send(trabajosResultado)
        return;
        });
    };

    if (terminado == false) {
        trabajosResultado.forEach((trabajo) => {
            if (!trabajo.finalizado) {
                trabajosResultado.push(trabajo);
            };
        response.send(trabajosResultado);
        return;
        })
    };
    
});


//Definir el GET para un trabajo dado por el id
trabajosRouter.get("/:idTrabajo", (request, response) => {
    let trabajoHallado = null;

    const trabajoId = request.params.idTrabajo; //Obtengo el "id" del trabajo que viene en la url del navegador

    //busco el trabajo correspondiente a ese id
    trabajos.forEach((trabajo) => {
        if (trabajoId == trabajo.idTrabajo) {
            trabajoHallado = trabajo;
        };
    });

    //si no existe debo dar el error
    if (trabajoHallado == null) {
        response.statusCode = 404;
        response.send({error: "No existe ese codigo de trabjo"});
        return;
    };

    //retorno el trabajo hallado
    response.send(trabajoHallado);
});


module.exports = trabajosRouter;
