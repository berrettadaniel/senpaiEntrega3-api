const { request } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Daniel3aEntrega"; //Establezco el string que utilizara el hash para encriptar


const authMiddleware = (request, response, next) => {
    //Obtengo el token que viene en el request
    const token = request.header("Authorization");

    //Si no me mandan un token, se deniega el accceso y se devuelve error
    if (!token) {
        return response.status(401).send({
            error: "Acceso Denegado"
        });
    }

    //Debo validar el token
    try { //Caso en que es valido
        const verify = jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) { //Caso en que no es valido y hay error
        return response.status(400).send({
            error: "Token no valido",
        });
    }
};


module.exports = { authMiddleware, JWT_SECRET };
