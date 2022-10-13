const express = require('express');
const app = express();
// permite escuchar peticiones, es la app de express


const path = require('path');
require('dotenv').config();

const server = require('http').createServer(app);
//crea un server en node, le agrega a la app de express todo lo relacionado con el server de sockets

module.exports.io = require('socket.io')(server);
//const io = require('socket.io')(server);
//crea el server de entrada y salida de datos
require('./sockets/socket');
var today = new Date();
/*
io.on('connection', client => 
{
    console.log("Mensaje1, cliente conectado");
     
    //client.on('event', data => 
    //{ 
    //    console.log("Mensaje1, cliente conectado");
    //});
     
    client.on('disconnect', () => 
    {  
        console.log("Mensaje2, cliente desconectado");
    });

    //escuchar un mensaje
    client.on('mensaje', (payload)=> 
    {
        console.log ('si recibi el MENSAJE!!!');
        console.log(payload);
        io.emit('mensaje', {mensaje: 'he recibido el payload', payload});
    });


    client.on('nuevo-mensaje', (payload)=> 
    {
        console.log ('si recibi el NUEVO MENSAJE, YEEEE!!! 333333');
        console.log(payload);
        io.emit('mensaje', {mensaje: 'he recibido el NUEVO MENSAJE YEEEE payload 3333333', payload});
    });
}
);
    
   */

const publicPath = path.resolve(__dirname, 'public');
//__dirname, indica en donde apunta nuestro servidor
console.log (publicPath);
app.use(express.static(publicPath));
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log ("Wilma, revisa, el Servidor corriendo en el puerto");
    
    console.log(process.env.PORT);
    /*
    console.log (publicPath);
    */
})


