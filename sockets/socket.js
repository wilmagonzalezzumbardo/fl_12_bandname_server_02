const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

const bands = new Bands();

bands.addBand(new Band ('Mateos'));
bands.addBand(new Band ('Matisse'));
bands.addBand(new Band ('Dalessio'));
bands.addBand(new Band ('Burbujas'));
//console.log (bands);

var today = new Date();
//mensajes de sockets
io.on('connection', client => 
{
    console.log("Mensaje1, cliente conectado");
    console.log(today);
    
    console.log(client.handshake.headers['x-token']);
    const [valido, uid ] = comprobarJWT (client.handshake.headers['x-token']);
    console.log (valido);
    console.log (uid);
    // verifica autenticacion
    if (!valido)
    {
        return client.disconnect();
    }


    // Cliente autenticado
    usuarioConectado(uid);


    //Ingresar al usuario a una sala en particular
    //SALA GLOBAL

    //SALA PRIVADA, 
    client.join(uid);

    //escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload) => {
        //grabar mensaje
        await grabarMensaje(payload);


        console.log(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    console.log ("cliente conectado " . uid);

    console.log ("on connection INI");
    var sLista = bands.getBands();
    console.clear();
    //console.log (sLista);
    console.table(sLista);
    console.log ("on connection FIN");
    client.emit('active-bands', sLista);
     
    //client.on('event', data => 
    //{ 
    //    console.log("Mensaje1, cliente conectado");
    //});
     
    client.on('disconnect', () => 
    { 
        console.log("Mensaje2, cliente desconectado");
        console.log(today);
        usuarioDesconectado(uid);
    });

    //escuchar un mensaje
    client.on('mensaje', (payload)=> 
    {
        io.emit('mensaje', {mensaje: 'he recibido el payload del mensaje', payload});
    });

    client.on('new-band', (payload)=>
    {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload)=> 
    {
        console.log ('delete-band ini');
        console.log (payload);
        console.log ('delete-band fin');
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('vote-band', (payload)=> 
    {
        console.log ('vote-band ini');
        console.log (payload);
        console.log ('vote-band fin');
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('emitir-nuevo-mensaje', (payload)=> 
    {
        // emite el mensaje a todos los usuarios incluyendose uno mismo
        //io.emit('emitir-nuevo-mensaje', {mensaje: 'he recibido el payload del NUEVO-MENSAJE mensaje222222', payload});
        // emite el mensaje a todos excepto a uno mismo
        console.log(" INI en el client.on en emitir nuevo mensaje");
        console.log(payload);
        client.broadcast.emit('emitir-nuevo-mensaje', payload);
        console.log(" FIN en el client.on en emitir nuevo mensaje");
    });

}
);