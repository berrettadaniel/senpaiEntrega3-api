//Middleware para rutas no encontradas


const notFoundMiddleware = (request, response) => {
    response.statusCode = 404;
    response.send({
      mensaje: "No existe esa ruta",
    });
  };
  

  module.exports = notFoundMiddleware;