//API para manejo de usuarios
//COPIA del auth.router.js para revisar con Gustavo por un problema que tenia.
//Lo dejo para revision futura.

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//PARA PRUEBA
//const bodyParser = require('body-parser');


//Requerir el string de encriptacion definido en el middleware
const { JWT_SECRET } = require("../middlewares/auth.middleware");
//const { response } = require("express");


//Crear el router
const authRouter = express.Router();

//PARA PRUEBA
//authRouter.use(bodyParser.urlencoded({ extended: false }));
//authRouter.use(bodyParser.json());

//Lista de usuarios "fake"
const usuarios = [
    {
        email: "berretta.daniel@gmail.com",
        password: "123"
    },
    {
        email: "gustavguez@gmail.com",
        password: ""
    }
];


//Definir el POST para hacer el login y las validaciones correspondientes.
authRouter.post("/login", async (request, response) => {
    //Obtengo parametros que viene en el body del request.
    const email = request.body.email;
    const password = request.body.password;

    console.log("email", email); //ESTO ME MUESTRA UNDEFINED EN CONSOLA *****
    console.log("password", password); //ESTO ME MUESTRA UNDEFINED EN CONSOLA ******

    //Verifico si el usuario esta en la BD
    const usuario = usuarios.find((usuarioSistema) => {
        return usuarioSistema.email === email;
    })


    //Si el usuario no existe, devuelvo un error
    if (!usuario) {
        return response.status(400).send({
            error: "Usuario inexistente"
        });
    }

    //Verifico si la clave enviada es igual a la del usuario
    const esIgualPassword = await bcrypt.compare(password, usuario.password);
    if (!esIgualPassword) {
      return response.status(400).send({
        error: "Clave incorrecta",
      });
    }

    //El usuario esta autenticado, entonces se puede generar el jwt
    //para controlar los accesos al sistema.
    const token = jwt.sign(
        {
        email: usuario.email,
        },
        JWT_SECRET
    );

    //Login exitoso (validados email y password)
    //En el token se devuelve el JsonWebToken que se utiliza como "variable de sesion"
    response.send({
        error: null,
        mensage: "¡Login correcto!",
        token: token,
    });
});


//Definir el POST para registrar un nuevo usuario haciendo las validaciones correspondientes.
authRouter.post("/register", (request, response) => {
    const password = request.body.password; /// FALTA ENCRIPTARLA

    const email = request.body.email; //Verifico si el usuario ya existe
    usuarios.forEach((usuario) =>{
        if (usuario.email === email) {
            return response.status(400).send({
                error: "Usuario existente",
            });
        };
    });

    const nuevoUsuario = {
        email: request.body.email,
        password: password  //ACA SE ASIGNARA EL VALOR INGRESADO EN LA UI ENCRIPTADO
    };
    usuarios.push(nuevoUsuario);
    console.log(usuarios);

    response.json({success: true, nuevoUsuario, usuarios });

});

module.exports = authRouter;
