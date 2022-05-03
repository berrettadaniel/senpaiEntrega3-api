//API para los servicios que gestiona el sistema.
//Por cada servicio se tiene un id, nombre, e imagenes para la UI.


const express = require('express');
const serviciosRouter = express.Router();
const db = require("../configs/db"); // ======>>> NO FUNCIONO
const { Client } = require("pg");

// Requerir autorizacion (auth.middleware)
// DESCOMENTAR LA SIGUIENTE LINEA CUANDO ESTE PROGRAMADO EL "authMiddleware"
// const { authMiddleware } = require("./../middlewares/auth.middleware");


// Informacion "fake"
// Devolvere lo que tenia en el db.json de la Entrega 2

const serviciosFAKE = [
  {
    id: 1,
    nombre: "Albañileria",
    archivo: "/assets/imagesOficios/Oficio_albanil.jpg",
    archivoTransp: "/assets/imagesServicios/ServiceAlbanileria_transp.png"
  },
  {
    id: 2,
    nombre: "Carpinteria",
    archivo: "/assets/imagesOficios/Oficio_carpintero.jpg",
    archivoTransp: "/assets/imagesServicios/ServiceCarpinteria_transp.png"
  },
  {
    id: 3,
    nombre: "Electricidad",
    archivo: "/assets/imagesOficios/Oficio_electricista.jpg",
    archivoTransp: "/assets/imagesServicios/ServiceElectricidad_transp.png"
  },
  {
    id: 4,
    nombre: "Fumigacion",
    archivo: "/assets/imagesOficios/Oficio_fumigador.jpg",
    archivoTransp: "/assets/imagesServicios/ServiceJardineria_transp.png"
  },
  {
    id: 5,
    nombre: "Jardineria",
    archivo: "/assets/imagesOficios/Oficio_jardinero.jpg",
    archivoTransp: "/assets/imagesServicios/ServiceJardineria_transp.png"
  },
  {
    id: 6,
    nombre: "Limpieza",
    archivo: "/assets/imagesOficios/Oficio_limpieza.jpg",
    archivoTransp: "/assets/imagesServicios/ServicePintura_transp.png"
  },
  {
    id: 7,
    nombre: "Sanitaria",
    archivo: "/assets/imagesOficios/Oficio_sanitario.jpg",
    archivoTransp: "/assets/imagesServicios/ServSanitaria_transp.png"
  }
];


//Definir el GET para toda la lista de servicios
serviciosRouter.get("/", async (request, response) => {
    //Conexion a la BD
    const client = new Client();
    await client.connect();

    //Query a la BD
    const responseBD = await client.query('select * from servicios;');
    const servicios = responseBD.rows; //Obtengo el array de registros de la query a la BD
                                        //Es lo que inicialmente lo cargaba como un array "hard code" en este router
    await client.end();
    //Cierre de conexion

    response.send(servicios);
// Esta parte del codigo fue solo a modo de prueba. Lo dejo comentado para tenerlo a futuro.
//
//  let totalServicios = 0;
//  servicios.forEach((servicio) => {
//    totalServicios += 1;
//  });
//  console.log("total de servicios obtenidos:", totalServicios);
});


//Definir el GET para un servicio por su id

    //Cuando este definido el middleware el "get por idServicio" debe ser algo asi:
    // serviciosRouter.get("/:idServicio", authMiddleWare (request, response) => {
serviciosRouter.get("/:idServicio", async (request, response) => {
  const servicioId = request.params.idServicio; //Obtengo el "id" del Servicio que viene en la ruta del navegador

  //Conexion a la BD
  const client = new Client();
  await client.connect();

  //Query a la BD
  const responseBD = await client.query('select * from servicios where id=$1;',[servicioId]);
  const servicioHallado = responseBD.rows[0]; //Obtengo el array de registros de la query a la BD
  await client.end();
  //Cierre de conexion

  //Retorno el servicio hallado
  response.send(servicioHallado);

/*  
  //Busco el servicio correspondiente a ese id
  servicios.forEach((servicio) => {
    if (servicio.id == servicioId) {
      servicioHallado = servicio;
    }
  });

  //Si no existe debo dar el error
  if (servicioHallado === null) {
    response.statusCode = 404;
    response.send({error: "No existe ese codigo de servicio"});
    return;
  };

  //Retorno el servicio hallado
  response.send(servicioHallado);
*/
});


module.exports = serviciosRouter;
