const { response } = require('express');
const jwt = require ('jsonwebtoken');
/*
El código de error HTTP 401 indica que la petición (request) no ha sido ejecutada porque carece de credenciales válidas de autenticación para el recurso solicitado.
Error 400, La respuesta de código de estado del Protocolo de Transferencia de Hipertexto (HTTP) 400 Bad Request indica que el servidor no puede o no procesará la petición debido a algo que es percibido como un error del cliente (p.
HTTP Error 500 – Internal Server Error

*/

const validarJWT = (req, res= response, next)=>
{
    //leer el token
    //cuando se hable esta funcion, en el header debe haber un key que se llame x-token, todo aquellos que comience con x- se refiere a campos personalizados
    const token = req.header('x-token');
    console.log (token);
    if (!token)
    {
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en la peticion' 
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador, ocurrió un error '  + error
        });
    }

    
}

module.exports =
{
    validarJWT
}