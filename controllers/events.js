import { response, request } from 'express';
import Event from '../models/Event.js';
import mongoose from 'mongoose';


export const getEvents = async ( req = request , res = response ) => {

    try {
        
        const events = await Event.find().populate('user','name email');
        const count = await Event.count();

        res.json({
        ok: true,
        msg: 'Events list',
        count, events
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, msg: 'Error in the server', error
        });
    };
};


export const createEvents = async ( req = request , res = response ) => {

    try {

        const event = new Event( req.body );
        // @ts-ignore
        event.user = req.uid;
        const eventDB = await event.save();

        res.json({
            ok: true,
            msg: 'Event Created',
            eventDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, msg: 'Error inesperado', error
        });
    };
};


export const updateEvent = async ( req = request , res = response ) => {

    try {

        const eventId = req.params.id;
        const { ...rest } = req.body;
        // @ts-ignore
        const userUid = req.uid;

        const isMongoId = mongoose.Types.ObjectId.isValid( eventId );        
        if( !isMongoId ) {
            return res.status(404).json({
                ok: false,
                msg: `Event with id: ${eventId} not found`
            });
        };
        
        const evento = await Event.findById(eventId);
        if( evento.user != userUid ) {
            return res.status(401).json({
                ok: false,
                msg: 'User not authorized'
            });
        };

        const event = await Event.findByIdAndUpdate( eventId, rest, { new: true } );

        res.json({
            ok: true,
            msg: 'update event',
            event
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, msg: 'Error inesperado', error
        });
    };
};


export const deleteEvent = async ( req = request , res = response ) => {

    try {

        const eventId = req.params.id;
        const { ...rest } = req.body;
        // @ts-ignore
        const userUid = req.uid;

        const isMongoId = mongoose.Types.ObjectId.isValid( eventId );        
        if( !isMongoId ) {
            return res.status(404).json({
                ok: false,
                msg: `Event with id: ${eventId} not found`
            });
        };
        
        const evento = await Event.findById(eventId);
        if( evento.user != userUid ) {
            return res.status(401).json({
                ok: false,
                msg: 'User not authorized'
            });
        };

        const event = await Event.findByIdAndDelete( eventId , { new: true } );

        res.json({
            ok: true,
            msg: 'Event deleted',
            event
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, msg: 'Error inesperado', error
        });
    };
};