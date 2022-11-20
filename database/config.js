const mongoose = require ('mongoose');
require('dotenv').config();

console.log("dentro del config.js");
const dbConnection = async() =>
{
    console.log('dentro del async');
    console.log(process.env.DB_CNN);
    console.log('prueba');
    console.log('prueba ');
    try
    {
        /*
        const mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/test');
        const Cat = mongoose.model('Cat', { name: String });
        const kitty = new Cat({ name: 'Zildjian' });
        kitty.save().then(() => console.log('meow'));
        */
        /*
        await mongoose.connect(process.env.DB_CNN, 
            {
                useNewUrlParse: true,
                useUnifiedTopology:true,
                useCreateIndex:true
            });
        */
       console.log(process.env.DB_CNN);
       
        await mongoose.connect(process.env.DB_CNN);
        //await mongoose.connect('mongodb+srv://chat_user1:iTZsLeeOokWmYRhe@cluster0.yusqp.mongodb.net/chat');
        console.log('ini de la base de datos....');
        console.log('bd online');
    }
    catch(error)
    {
        console.log('error');
        throw new Error('Error en la bd, hable con el admin');
    }
}

module.exports = 
{
    dbConnection
}