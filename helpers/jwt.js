const jwt = require ('jsonwebtoken');

const generarJWT = ( uid ) =>
{
    return new Promise( (resolve, reject) => {
        const payload = {uid};
        jwt.sign(
            payload, 
            process.env.JWT_KEY, 
            {
                expiresIn: '24h'
            },
            //call back
            (err, token ) =>
            {
                if (err)
                {
                    reject('No se pudo generar el JWK');
                }
                else
                {
                    resolve (token);
                }
            }
        );
    });
}


module.exports = {
    generarJWT
};
