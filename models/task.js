import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type:String,
        required:true,

    },
    description: {
        type:String,
        required:true,
        unique:true,

    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
 type:mongoose.Schema.Types.ObjectId,
 //jo bhi db mae collection ka nam hota hai vo ref mae dete hain
 ref:"User",
 reqired:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

export const Task = mongoose.model("Task",schema);