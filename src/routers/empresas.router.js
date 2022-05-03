//API para las empresas.

const express = require('express');
const empresasRouter = express.Router();
const db = require("../configs/db"); // ======>>> NO FUNCIONO
const { Client } = require("pg");

// Requerir autorizacion (auth.middleware)
const { authMiddleware } = require("./../middlewares/auth.middleware");


// Informacion "fake"
// Devolvere una lista de empresas que despues debo obtener de la Base de Datos

const empresasFAKE = [
    {
      "id": 1,
      "nombre": "MetaCucharin",
      "telefono": "099111111",
      "email": "consulta@metacucharin.com",
      "idServicio": 1    //Albanileria
    },
    {
      "id": 2,
      "nombre": "Cable pelado",
      "telefono": "099231111",
      "email": "consulta@cablepelado.com",
      "idServicio": 3    //Electricidad
    },
    {
      "id": 3,
      "nombre": "TablaAstillada",
      "telefono": "099321111",
      "email": "consulta@tablaastillada.com",
      "idServicio": 2    //Carpinteria
    },
    {
      "id": 4,
      "nombre": "ClavoEnElDedo",
      "telefono": "099421111",
      "email": "consulta@clavoeneldedo.com",
      "idServicio": 2    //Carpinteria
    },
    {
      "id": 5,
      "nombre": "ChauMosquito",
      "telefono": "099541111",
      "email": "consulta@chaumosquito.com",
      "idServicio": 4    //Fumigacion
    },
    {
      "id": 6,
      "nombre": "CueritoFlojo",
      "telefono": "099671111",
      "email": "consulta@cueritoflojo.com",
      "idServicio": 7    //Sanitaria
    }
];


//Definir el GET para toda la lista de empresas
empresasRouter.get("/", async (request, response) => {

  //Conexion a la BD
  const client = new Client();
  await client.connect();

  //Query a la BD
  const responseBD = await client.query('select * from empresas;');
  const empresas = responseBD.rows; //Obtengo el array de registros de la query a la BD
                                    //Es lo que inicialmente lo cargaba como un array "hard code" en este router
  await client.end();
  //Cierre de conexion
  
  response.send(empresas);
});


//Definir el GET para una empresa por su id

//No utilizare el middleware porque no quedo funcionando correctamente la api de authorization.
//Con el authmiddleware no me aparecen las empresas de un servicio en la UI (serviciopage.jsx)
//Debi dejarlo asi para poder probar el uso de Base de Datos. :(

//empresasRouter.get("/:idEmpresa", authMiddleware, (request, response) => {
empresasRouter.get("/:idEmpresa", async (request, response) => {
  const empresaId = request.params.idEmpresa; //Obtengo el idEmpresa que viene en la url del navegador

  //Conexion a la BD
  const client = new Client();
  try{
  await client.connect();

  //Query a la BD
  const responseBD = await client.query('select * from empresas where id=$1;', [empresaId]);
  const empresaHallada = responseBD.rows[0]; //Obtengo el array de registros de la query a la BD
                                    //Es lo que inicialmente lo cargaba como un array "hard code" en este router
  await client.end();
  //Cierre de conexion

  //Si existe la devuelve como resultado
  response.send(empresaHallada);
  }

  catch (empresaHallada) {
    response.statusCode = 404;
    response.send({error: "No existe ese codigo de empresa"});
    return;
  }

/*
  //busco la empresa correspondiente a ese id
  empresas.forEach((empresa) => {
    if (empresa.id == empresaId) {
      empresaHallada = empresa;
    };
  });

  //si no existe debo dar el error
  if (empresaHallada == null) {
    response.statusCode = 404;
    response.send({error: "No existe ese codigo de empresa"});
    return;
  };

  //Si existe la devuelve como resultado
  response.send(empresaHallada);
*/
});


//Definir el GET para obtener empresas por idServicio
//empresasRouter.get("/servicio/:idServicio", authMiddleware, (request, response) => {
empresasRouter.get("/servicio/:idServicio", async (request, response) => {
  let empresasHalladas = []; //Inicializo variable de resultado
  const ServicioId = request.params.idServicio; //Obtengo el id del servicio que viene como parametro

  //Conexion a la BD
  const client = new Client();
  try{
    await client.connect();

    //Query a la BD
    const responseBD = await client.query('select * from empresas where idServicio=$1;', [ServicioId]);
    const empresasHalladas = responseBD.rows; //Obtengo el array de registros de la query a la BD
                                      //Es lo que inicialmente lo cargaba como un array "hard code" en este router
    await client.end();
    //Cierre de conexion

    //Devuelvo la lista de empresas halladas.
    response.send(empresasHalladas);
  }

  catch (empresasHalladas) {
    response.statusCode = 404;
    response.send({error: "No existen empresas para ese servicio"});
    return;
  }
/*
  empresas.forEach((empresa) => {
    if (empresa.idServicio == ServicioId) {
      empresasHalladas.push(empresa);
    };
  });
*/

});


module.exports = empresasRouter;
