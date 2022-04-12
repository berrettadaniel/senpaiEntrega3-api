//Requerir librerias externas (Node y Express)
const cors = require('cors');
const express = require('express');
const parser = require('body-parser');
// const path = require('path'); ---> ver si se va a precisar para manejo de archivos
//                                    Tal vez puede servir para subir recibos o facturas

//API del sistema
const api = express();

//Requerir routers para la API
const authRouter = require('./routers/auth.router');
const empresasRoute = require('./routers/empresas.router');
const serviciosRoute = require('./routers/servicios.router');
const tareasRoute = require('./routers/tareas.router');
const trabajosRoute = require('./routers/trabajos.router');

//Requerir middlewares
const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorsMiddleware = require("./middlewares/errors.middleware");

//Utilizar los routers definidos para la API
api.use("/auth", authRouter);
api.use("/empresas", empresasRoute);
api.use("/servicios", serviciosRoute);
api.use("/tareas", tareasRoute);
api.use("/trabajos", trabajosRoute);


//Utilizar middlewares para "manejo de errores"
api.all("/*", notFoundMiddleware); //Si no matchea con ninguna de las rutas anteriores, da error de ruta inexistente
api.use(errorsMiddleware);


//Levantar la API en puerto 4000 tal como estaba en la Entrega 2
api.listen(4000, () => {
    console.log("puse a andar la API en puerto 4000");
});


/*
listar es un GET
seleccionar es un GET con algun ID
agregar es un POST
actualizar es un PUT
eliminar es un DELETE

AUTH
/auth/login
/auth/registro

EMPRESAS
/empresas
/empresas/:idEmp

TRABAJOS
/trabajos/:idEmp (para el DELETE y el POST)
/trabajos/listarFinalizados/:idEmp (es un GET pero que ademas busco solo los que estan en estado "finalizado")

TAREAS
/tareas/:idEmp (POST, GET, y DELETE)

*/
