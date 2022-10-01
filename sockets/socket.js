const { io } = require('../index');
var today = new Date();
//mensajes de sockets
io.on('connection', client => 
{
    console.log("Mensaje1, cliente conectado");
    console.log(today);
     
    //client.on('event', data => 
    //{ /* … */ 
    //    console.log("Mensaje1, cliente conectado");
    //});
     
    client.on('disconnect', () => 
    { /* … */ 
        console.log("Mensaje2, cliente desconectado");
        console.log(today);
    });

    //escuchar un mensaje
    client.on('mensaje', (payload)=> 
    {
        console.log ('si recibi el MENSAJE!!!');
        console.log(payload);
        console.log(today);
        io.emit('mensaje', {mensaje: 'he recibido el payload del mensaje', payload});
    });
}
);