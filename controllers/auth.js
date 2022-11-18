const {response} = require('express');
const bcrypt = require ('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const buscaLogin = async (req, res = response) =>
{
    const {email, password, token} = req.body;
    try
    {
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail== false)
        {
            return res.status(400).json({
                ok: false,
                msg: "El correo registrado no existe"
            });
        }
        const usuario = new Usuario(req.body);
        const validaPassword = bcrypt.compareSync(usuario.password, existeEmail.password);
        if (validaPassword == false)
        {
            return res.status(400).json({
                ok: false,
                msg: "El password registrado no coincide"
            });
        }
        //generar el JWT
        const token = await generarJWT(existeEmail.id);
        res.json({
            ok: true,
            msg: 'Usuario encontrado',
            usuario: existeEmail,
            token
            });
    }
    catch(error)
    {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador, hubo un error al momento de validar el login del usuario | ' + error 
        });
    }
}
 
const controllerRenuevaToken = async (req, res = response ) =>
{   
    const uid = req.uid;
    console.log(uid);
    //const usuarioDB = await Usuario.findOne({_id : uid});
    const usuarioDB = await Usuario.findById(uid);
    const token = await generarJWT(uid);
    console.log(token);
    res.json({
        ok: true,
        usuario: usuarioDB,
        token

    });
}


const crearUsuario = async (req, res = response )=> {
   
    const {email, password, nombre} = req.body;
    //const {email} = req.body;
    //const email = req.body.email;

    try{
        //const existeEmail = await Usuario.findOne({email: email});
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail)
        {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado previamente"
            });
        }
        
        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();  //garantiza que una contraseña sea diferente aun cuando sea la misma en otros registros
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //generar el json web token  JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            
            msg: 'Crear usuario dentro del controller!!!',
            //body: req.body
            usuario,
            token
        });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador, hubo un error al momento de crear el registro de usuario | ' + error 
        });
    }

    
};

module.exports = {
    crearUsuario,
    buscaLogin,
    controllerRenuevaToken
};
//una funcion de flecha no actualiza el valor de this
