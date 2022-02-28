import { Router } from 'express';
import { check } from 'express-validator';

import { newUser, userLogin, renewToken } from '../controllers/auth.js'; 
import { validarCampos } from '../middlewares/validate-fields.js';
import { validarJWT } from '../middlewares/validate-jwt.js';

export const authRouter = Router();

authRouter.post( '/register', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must have 6 characters or more').isLength({ min: 6 }),
    validarCampos
], newUser );

authRouter.post( '/', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password must have 6 characters or more').isLength({ min: 6 }),
    validarCampos
] , userLogin );


authRouter.get( '/renew', validarJWT, renewToken );