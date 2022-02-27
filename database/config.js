import mongoose from 'mongoose';
// const mongoose = require('mongoose');

export const dbConnection = async () => {
    
    try {
        
        // @ts-ignore
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB connection successful'.bgGreen.black);
        
    } catch (error) {
        console.log(error);
        throw new Error('DB connection error!'.bgRed.black);
    };
};

// module.exports = {
//     dbConnection
// }