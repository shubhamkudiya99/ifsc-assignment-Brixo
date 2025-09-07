import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI;

mongoose.connect(mongoUrl);
const db = mongoose.connection;

db.on('connected', () =>{
    console.log('Connected to the MongoDB Server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error : ', err);
});

db.on('disconnected', () =>{
    console.log('MongoDB Disconnected');
});

export default db;