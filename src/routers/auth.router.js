//API para manejo de usuarios

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Requerir el string de encriptacion definido en el middleware
const { JWT_SECRET } = require("../middlewares/auth.middleware");
//const { response } = require("express");


//Crear el router
const authRouter = express.Router();


//Lista de usuarios "fake"
const usuarios = [
    {
        email: "berretta.daniel@gmail.com",
        password: "$2b$10$O9h1BWHlw2ag3jtV1y8raOrR8ucVsyBSuWDtdLSarUhacoHL0pY.2" //123
    },
    {
        email: "gustavguez@gmail.com",
        password: "",
    }
];


//Definir el POST para hacer el login y las validaciones correspondientes.
authRouter.post("/login", async (request, response) => {
    //Obtengo parametros que viene en el body del request.
    const email = request.body.email;
    const passwordValor = request.body.password;

    //Verifico si el usuario esta en la BD
    const usuario = usuarios.find((usuarioSistema) => usuarioSistema.email === email);
    console.log("usuario", usuario);
    console.log(passwordValor);
    //Si el usuario no existe, devuelvo un error
    if (!usuario) {
        return response.status(400).send({error: "Usuario inexistente"});
    }

    //Verifico si la clave enviada es igual a la del usuario
    const esIgualPassword = await bcrypt.compare(passwordValor, usuario.password);

    //const valorSalt = await bcrypt.getRounds(usuario.password);
    //console.log("valorSalt", valorSalt);
    //const esigual = await bcrypt.hash(passwordValor, valorSalt) === usuario.password;
    //console.log("esigual", esigual);

    if (!esIgualPassword) {
        return response.status(400).send({error: "Clave incorrecta"});
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
        mensaje: "¡Login correcto!",
        token: token,
    });
});


//Definir el POST para registrar un nuevo usuario haciendo las validaciones correspondientes.
authRouter.post("/register", async (request, response) => {

    const saltValor = await bcrypt.genSalt(10);
    const passwordValor = request.body.password;
    const password = await bcrypt.hash(passwordValor, saltValor); /// FALTA ENCRIPTARLA

    const email = request.body.email; //Verifico si el usuario ya existe

    console.log(email, passwordValor, password);

    /*

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
    */
   response.json({success: true});

});

module.exports = authRouter;
