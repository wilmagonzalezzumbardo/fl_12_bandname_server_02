const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
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