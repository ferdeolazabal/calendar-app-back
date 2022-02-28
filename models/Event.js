import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EventSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    notes: { type: String },
    start: {
        type: Date,
        required: [true, 'La fecha es necesaria']
    },
    end: {
        type: Date,
        required: [true, 'La fecha es necesaria']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es necesario']
    }
});

EventSchema.methods.toJSON = function() {
    const { __v, _id, ...event } = this.toObject();
    event.id = _id;
    return event;
};

export default model('Event', EventSchema);