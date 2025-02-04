import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import {User} from "../db/models/user.js"


export const registerUser = async({name, email, password})=>{
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw createHttpError(409, 'Email in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    return{
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt:newUser.createdAt,
        updatedAt: newUser.updatedAt,
    }
}
