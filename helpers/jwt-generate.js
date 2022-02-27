import jwt from 'jsonwebtoken';
const { sign } = jwt;

export const generarJwt = ( uid = '' , name = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };
        const secret = process.env.SECRET_OR_PRIVATE_KEY || ''
        const expiresIn = '4h';
        

        sign( payload, secret, { expiresIn },
            ( err, token ) => {
                if( err ) {
                    console.log(err);
                    reject('Error inesperado, no se generó el token');
                } else {
                    resolve( token );
                }
            }
        );
    });

};