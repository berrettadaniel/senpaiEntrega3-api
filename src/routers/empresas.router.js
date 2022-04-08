const express = require('express');
const empresasRouter = express.Router();

// Requerir autorizacion (auth.middleware)


// Informacion "fake"
// Devolvere una lista de empresas que despues debo obtener de la Base de Datos

const empresas = [
    {
      "id": 1,
      "nombre": "MetaCucharin",
      "telefono": "099111111",
      "idServicio": 1    //Albanileria
    },
    {
      "id": 2,
      "nombre": "Cable pelado",
      "telefono": "099231111",
      "idServicio": 3    //Electricidad
    },
    {
      "id": 3,
      "nombre": "TablaAstillada",
      "telefono": "099321111",
      "idServicio": 2    //Carpinteria
    },
    {
      "id": 4,
      "nombre": "ClavoEnElDedo",
      "telefono": "099421111",
      "idServicio": 2    //Carpinteria
    },
    {
      "id": 5,
      "nombre": "ChauMosquito",
      "telefono": "099541111",
      "idServicio": 4    //Fumigacion
    },
    {
      "id": 6,
      "nombre": "CueritoFlojo",
      "telefono": "099671111",
      "idServicio": 7    //Sanitaria
    }
];


//Definir el GET
empresasRouter.get("/", (request, response) => {
  response.send(empresas);
});

module.exports = empresasRouter;
