/*
path: ???
path: api/usuarios

app.use('api/login', require('./routes/auth'));
*/
const {Router} = require ('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const {getUsuarios} = require('../controllers/usuarios');



router.get ('/', validarJWT, getUsuarios);

module.exports = router;
  