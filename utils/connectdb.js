import mongoose from "mongoose";


const connection = {};

async function dbConnect(){
    if (connection.isConnected){
        return;
    }
    const db = mongoose.connect(process.env.MONGO_URI, {
        useNewURLParser: true,
        useUnifiedTopology: true,
    });
}

export default dbConnect;