//idea
//por cada empresa y usuario tengo "trabajos"
//cada trabajo esta en transcurso o terminado

// idTrabajo, idUsuario, idEmpresa, estado, fechaInicio, fechaFin

const express = require('express');
const trabajosRouter = express.Router();

// Requerir autorizacion (auth.middleware)


// Informacion "fake"

const trabajos = [
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


//Definir el GET
trabajosRouter.get("/", (request, response) => {
    response.send(trabajos);
  });
  
module.exports = trabajosRouter;
