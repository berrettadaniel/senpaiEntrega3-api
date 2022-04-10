//API para Lista de Tareas por cada trabajo.
//Cada trabajo tiene un idTrabajo, entonces en esta API para cada trabajo tenemos:
//      - idTrabajo
//      - fechaTarea
//      - descripcionTarea
//          idTrabajo y fechaTarea serian claves en una tabla de la BD.


const express = require('express');
const tareasRouter = express.Router();

// Requerir autorizacion (auth.middleware)
// DESCOMENTAR LA SIGUIENTE LINEA CUANDO ESTE PROGRAMADO EL "authMiddleware"
// const { authMiddleware } = require("./../middlewares/auth.middleware");


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


//Definir el GET para toda la lista de tareas
tareasRouter.get("/", (request, response) => {
    response.send(tareas);
});


//Definir el GET para la lista de tareas correspondientes a un idTrabajo
//El array vacio no lo considero como un error para considerar en el router, es el caso de
//un trabajo para el que aun no se han registrado tareas.

tareasRouter.get("/:idTrabajo", (request, response) => {
    let tareasHalladas = []; //Inicializo variable de resultado.

    const trabajoId = request.params.idTrabajo; //Obtengo el "id" del trabajo que viene en la url del navegador

    //Busco las tareas del trabajo correspondiente a ese id
    tareas.forEach((tarea) => {
        if (trabajoId == tarea.idTrabajo) {
            tareasHalladas.push(tarea);
        };
    });

    //Retorno la lista de tareas del trabajo hallado
    response.send(tareasHalladas);
});


module.exports = tareasRouter;
