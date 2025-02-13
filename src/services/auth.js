import handlebars from "handlebars";
import path from "node:path";
import fs from "node:fs/promises";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import {User} from "../db/models/user.js"
import { Session} from "../db/models/session.js";
import { generateToken, FIFTEEN_MINUTES, ONE_MONTH, SMTP, TEMPLATES_DIR } from "../constants/tokens.js";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar.js";
import { sendEmail } from "../utils/sendMail.js";

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
export const refreshSession =async (refreshToken)=> {
    const existingSession = await Session.findOne({refreshToken});
    if (!existingSession){
        throw createHttpError(401, 'Invalid refresh token');
    }
    await Session.deleteOne({userId: existingSession.userId});
    const accessToken = generateToken();
    const newRefreshToken = generateToken();

    const newSession = await Session.create({
        userId: existingSession.userId,
        accessToken,
        refreshToken: newRefreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now()+ ONE_MONTH),
    });
    return {
        accessToken: newSession.accessToken,
        refreshToken: newSession.refreshToken,
    }
}
export const logoutUser = async(refreshToken) =>{
    const existingSession = await Session.findOne({refreshToken});
    if(!existingSession){
        throw createHttpError(401, 'Invalid refresh token');

    }
    await Session.deleteOne({refreshToken});
}
export const requestResetToken = async (email)=>{
    const user = await User.findOne({email});
    if(!user){
        throw createHttpError(404, 'User not found');
    }
    const resetToken = jwt.sign(
        {
            sub: user._id,
            email,
        },
        getEnvVar('JWT_SECRET'),
        {
            expiresIn: '5m',
        },
    );
const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
);
const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
).toString();

const template = handlebars.compile(templateSource);
const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${resetToken}`,
});

    await sendEmail({
        from: getEnvVar(SMTP.SMTP_FROM),
        to: email,
        subject: 'Reset your password',
        html,
    });
}
export const resetPassword = async (payload) => {
    let entries;
    try{
        entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));
    }catch(err){
        if(err instanceof Error) throw createHttpError(401, err.message);
        throw err;
    }
    const user = await User.findOne({
        email: entries.email,
        _id: entries.sub,
    });
    if (!user){
        throw createHttpError(404, 'User not found');
    }
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    await User.updateOne(
        {_id: user._id},
        {password: encryptedPassword},
    );
};
