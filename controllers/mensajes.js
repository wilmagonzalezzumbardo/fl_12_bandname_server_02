const { response } = require('express');
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res = response) =>
{
    //
    //{ok: true, msg: 'getusuarios '}
    const miId = req.uid;
    const mensajesDesde = req.params.de;

    const last30 = await Mensaje.find({
        $or: [{
            de: miId, para: mensajesDesde
        },
        {
            de: mensajesDesde, para: miId
        }
        ]
    })
    .sort({createdAt: 'desc'})
    .limit(30)
    ;

    res.json({
        ok: true,
        mensajes: last30

    });
}

 module.exports = {
    obtenerChat
 }