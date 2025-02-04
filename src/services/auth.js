import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import {User} from "../db/models/user.js"
import { Session} from "../db/models/session.js";
import { generateToken, FIFTEEN_MINUTES, ONE_MONTH } from "../constants/tokens.js";


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
export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw createHttpError(401, 'Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createHttpError(401, 'Invalid email or password');
    }
  

    await Session.deleteOne({ userId: user._id });
  
    const accessToken = generateToken();
    const refreshToken = generateToken();
  
    const session = await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
      refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
    });
  
    return {
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    };
  };
