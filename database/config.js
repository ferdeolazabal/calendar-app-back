import mongoose from 'mongoose';

export const dbConnection = async () => {
    
    try {
        
        // @ts-ignore
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // @ts-ignore
        console.log('DB connection successful'.bgGreen.black);
        
    } catch (error) {
        console.log(error);
        // @ts-ignore
        throw new Error('DB connection error!'.bgRed.black);
    };
};
