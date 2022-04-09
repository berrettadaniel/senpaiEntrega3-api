//lista de tareas por cada trabajo
//como cada trabajo tiene un idTrabajo, entonces aca por cada trabajo tengo:

//idTrabajo, fechaTarea, descripcionTarea
//idTrabajo y fechaTarea son clave

const express = require('express');
const { append } = require('express/lib/response');
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


//Definir el GET para una lista de tareas correspondientes a un idTrabajo
tareasRouter.get("/:idTrabajo", (request, response) => {
    let tareasHalladas = [];

    const trabajoId = request.params.idTrabajo; //Obtengo el "id" del trabajo que viene en la url del navegador

    //PREGUNTAR AL PROFE SI PRIMERO DEBO VALIDAR QUE EL TRABAJO EXISTA Y EN ESE CASO COMO HAGO PARA
    //ACCEDER A ESE ROUTER DESDE ESTE
    //PORQUE SI EL TRABAJO NO EXISTE ENTONCES NO PUEDO DEVOLVER TAREAS,
    //PERO PUEDE SUCEDER QUE EL TRABAJO EXISTA Y NO SE HAYAN GENERADO TAREAS AUN.
    //
    //    ***** VER SI REALMENTE LO HAGO ASI O SI NO CUANDO SE GENERA UN NUEVO TRABAJO AUTOMATICAMENTE LE AGREGO
    //    ***** UNA TAREA INICIAL Y CON ESO ME ASEGURO QUE SIEMPRE HAY TAREAS


    //busco las tareas del trabajo correspondiente a ese id
    tareas.forEach((tarea) => {
        if (trabajoId == tarea.idTrabajo) {
            tareasHalladas.push(tarea);
        };
    });

    //retorno la lista de tareas del trabajo hallado
    response.send(tareasHalladas);
});


module.exports = tareasRouter;
