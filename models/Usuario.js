import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    }
});


export default model('Usuario', UsuarioSchema);
// module.exports = model('Usuario', UsuarioSchema);