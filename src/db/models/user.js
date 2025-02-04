import { Schema } from "mongoose";

const userSchema = new Schema(
    {
    name: {type: string, required: true,},
    email:{type: string, required: true, unique:true,},
    password:{type: string, required: true,},
},
{ timestamps: true, versionKey: false,}

);
export const User = model('User', userSchema);