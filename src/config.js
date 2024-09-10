import mongoose from 'mongoose'


export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://UserNEcolombia:NEColombia2024-@54.82.237.65:27017/NEco?authSource=NEco");
        console.log("se conecto a la bd")
    }
    catch (error) {
        console.log("error conectado");
    }
};