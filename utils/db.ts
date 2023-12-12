import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        console.log('trying to connect to DB');
        await mongoose.connect('mongodb+srv://promtopia:promtopia@cluster0.vufqv.mongodb.net/?retryWrites=true&w=majority');

        console.log('connected to db successfully');

        isConnected = true;

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error);
    }
}