import { Router } from 'express';
import { check } from 'express-validator';
import { validarJWT } from '../middlewares/validate-jwt.js';
import { validarCampos } from '../middlewares/validate-fields.js';
import { 
    getEvents, 
    createEvents, 
    updateEvent, 
    deleteEvent 
    } from '../controllers/events.js';
import { isDate } from '../helpers/is-Date.js';

export const eventRouter = Router();


eventRouter.use(validarJWT);

eventRouter.get('/', getEvents )

eventRouter.post('/', [
    check('title', 'The title is required').not().isEmpty(),
    check('start', 'The start date is required').custom( isDate ),
    check('end', 'The end date is required').custom( isDate ),
    validarCampos
] ,createEvents )

eventRouter.put('/:id', updateEvent )

eventRouter.delete('/:id', deleteEvent )