const express = require('express');

const empresasRoute = require('./src/routers/empresas.router');
const tareasRoute = require('./src/routers/tareas.router');
const trabajosRoute = require('./src/routers/trabajos.router');

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
