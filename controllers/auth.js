import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import { generarJwt } from '../helpers/jwt-generate.js';

export const newUser = async ( req = request , res = response ) => {

    try {

        const { name, email, password } = req.body

        // verificar email en db
        const emailExist = await User.findOne({ email })
        if ( emailExist ) {
            return res.status(400).json({
                ok: false,
                message: 'The email already exists'
            })
        }

        const user = new User( { name, email, password } );
        
        // encriptar contraseña del usuario
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash( password, salt );


        await user.save();

        // generar y enviar token
        const token = await generarJwt( user.id, user.name );

        res.status(201).json({
            ok: true,
            msg: 'Register Ok',
            uid: user.id,
            name, email, token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error in the register',
        });
    }
};


export const userLogin = async (req, res = response ) => {

    try {

        const { email, password } = req.body

        // verificar email en db
        const user = await User.findOne({ email })
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid email or password - email..'
            })
        };
        // verificar password
        const validPassword = bcryptjs.compareSync( password, user.password )
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid email or password - password..'
            })
        };

        // generar JWT
        const token = await generarJwt( user.id, user.name );

        res.json({
            ok: true,
            msg: 'Login Ok',
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error in the login',
        });
    }

};

export const renewToken = async (req, res = response ) => {

    try {
        
        const { uid, name } = req;
        
        const token = await generarJwt( uid, name );

        res.json({
            ok: true,
            msg: 'Token renew Ok',
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error renewing token',
        });
    };
};