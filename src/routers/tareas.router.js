//lista de tareas por cada trabajo
//como cada trabajo tiene un idTrabajo, entonces aca por cada trabajo tengo:

//idTrabajo, fechaTarea, descripcionTarea
//idTrabajo y fechaTarea son clave

const express = require('express');
const tareasRouter = express.Router();

// Requerir autorizacion (auth.middleware)


// Informacion "fake"

const tareas = [
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


//Definir el GET
tareasRouter.get("/", (request, response) => {
    response.send(tareas);
  });
  
module.exports = tareasRouter;
