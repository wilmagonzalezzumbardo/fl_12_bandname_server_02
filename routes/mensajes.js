/*
path: ???
path: api/mensajes

app.use('api/login', require('./routes/auth'));
*/
const {Router} = require ('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const {obtenerChat} = require('../controllers/mensajes');



router.get ('/:de', validarJWT, obtenerChat);

module.exports = router;
  