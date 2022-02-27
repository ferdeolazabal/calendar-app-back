import { response, request } from 'express';
import jwt from 'jsonwebtoken';


export const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'Token necesario'
        })
    };
    
    try {
        // @ts-ignore
        const { uid, name } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY );
        // @ts-ignore
        req.uid = uid;
        // @ts-ignore
        req.name = name;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Token no válido'
        })
    };
};