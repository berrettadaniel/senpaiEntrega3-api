//API para las empresas.

const express = require('express');
const empresasRouter = express.Router();

// Requerir autorizacion (auth.middleware)
const { authMiddleware } = require("./../middlewares/auth.middleware");


// Informacion "fake"
// Devolvere una lista de empresas que despues debo obtener de la Base de Datos

const empresas = [
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
empresasRouter.get("/", (request, response) => {
  response.send(empresas);
});


//Definir el GET para una empresa por su id

    //Cuando este definido el middleware el "get por idEmpresa" debe ser algo asi:
empresasRouter.get("/:idEmpresa", authMiddleware, (request, response) => {
//empresasRouter.get("/:idEmpresa", (request, response) => {
  let empresaHallada = null;

  const empresaId = request.params.idEmpresa; //Obtengo el idEmpresa que viene en la url del navegador

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
});


//Definir el GET para obtener empresas por idServicio
empresasRouter.get("/servicio/:idServicio", authMiddleware, (request, response) => {
  let empresasHalladas = []; //Inicializo variable de resultado
  const ServicioId = request.params.idServicio; //Obtengo el id del servicio que viene como parametro

  empresas.forEach((empresa) => {
    if (empresa.idServicio == ServicioId) {
      empresasHalladas.push(empresa);
    };
  });

  //Devuelvo la lista de empresas halladas.
  response.send(empresasHalladas);
});


module.exports = empresasRouter;
