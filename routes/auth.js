/*
path: ???
app.use('api/login', require('./routes/auth'));

*/
const {Router, response} = require ('express');
const { crearUsuario } = require('../controllers/auth');
const {buscaLogin, controllerRenuevaToken} = require('../controllers/auth');
const { check, body } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();



router.post (
    '/new', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','El email registrado no es correcto').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('password','Deben ser mínimo 8 caracteres').isLength({min:8}),
        check('password','El password debe tener nùmeros').matches(/\d/),
        check('passwordConfirmation','Error en la confirmación de la contraseña').custom((value, {req}) =>
        {
            console.log('value,, de la ocnfirmacion' );
            console.log(req.body.password);
            console.log(req.body.passwordConfirmation);
            if (req.body.passwordConfirmation == req.body.password)
            {
                return ('Error en el pass y conf');
            }
        }),
        validarCampos
    ], 
    crearUsuario);
 /* [validaciones, proceso que valida.....] */ 
router.post('/buscalogin', 
            [
                check('email','El email es obligatorio').not().isEmpty(),
                check('email','El email registrado no es correcto').isEmail(),
                check('password','El password es obligatorio').not().isEmpty(),
                check('password','Deben ser mínimo 8 caracteres').isLength({min:8}),
                check('password','El password debe tener nùmeros').matches(/\d/),
                validarCampos
            ], 
            buscaLogin);
//cada ruta debe tener un nombre, un middlewear, controllador
router.get('/rutaTokenRenew', validarJWT, controllerRenuevaToken);

module.exports = router;
/*
router.post('/new', (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Crear usuario'
    });
});
*/
/*
    check('','').isLowercase.
    check('passwordConfirmation', 'No coincide el password y la confirmaciòn').custom(value)  !== req.body.password
    body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    */