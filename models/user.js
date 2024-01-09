import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type:String,
        required:true,

    },
    email: {
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        require:true,
        //hum direct password ko access nhi kr skte .select use krna hoga 
        //agr khi bhi access krna hai toh 
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

export const User = mongoose.model("User",schema);