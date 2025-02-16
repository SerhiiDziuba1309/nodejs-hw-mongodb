import createHttpError from "http-errors";
import { 
    registerUser,
    loginUser,
    refreshSession,
    logoutUser, 
    requestResetToken,
    resetPassword} from "../services/auth.js";


export const registerUserController = async (req, res, next) =>{
    try{
        const user = await registerUser(req.body);

        res.status(201).json({
            status: 201,
            message: 'Successfully registered a user!',
            data: user,
        })
    } catch (error){
        next(error)
    }
}
export const loginUserController = async (req, res, next) => {
    try{
        const session = await loginUser(req.body);

        res.cookie('refreshToken', session.refreshToken,{
            httpOnly: true,
            maxAge: 30*24*60*60*1000,
        });
        res.status(200).json({
            status: 200,
            message: 'Successfully logged in a user!',
            data:{
                accessToken: session.accessToken,
            
            },
        });
    }catch (error){
        next(error);
    }
};
export const refreshSessionController = async(req, res, next)=>{
    try{
        const {refreshToken} = req.cookies;
        if (!refreshToken){
            return res.status(401).json ({
                status: 401,
                 message:'Unauthorized: No refresh token' });
        }
        const session = await refreshSession(refreshToken);

        res.cookie('refreshToken', session.refreshToken, {
            httpOnly: true,
            maxAge: 30*24*60*60*1000,
        });
        res.status(200).json({
            status:200,
            message: 'Successfully refreshed a session!',
            data: {
                accessToken: session.accessToken,
            },
        });

    }catch (error){
        next(error)
    }
};
export const logoutUserController = async(req, res, next) =>{
    try{
        const{refreshToken} = req.cookies;
        
        if(!refreshToken){
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized: No refresh token'
            })
        }
        await logoutUser(refreshToken);
        res.clearCookie('refreshToken');
        res.status(204).send();

    } catch (error){
        next (error);
    }
};
export const requestResetEmailController = async(req, res, next) =>{
   try {
    const {email} = req.body;
    if(!email){
        throw createHttpError(400, "Email is required")
    }
 await requestResetToken(email);
    res.status(200).json({
        status: 200,
        message: 'Reset password email has been successfully sent',
        data: {},
    });
} catch (error){
    if(error.message.includes("User not found")){
        return next(createHttpError( 404, 'User not found!'));
    }
    if(error.message.includes("Failed to send email")){
        return next (createHttpError(500, "Failed to send email, please try again later"));

    }
    next(error);
}
};

export const resetPasswordController = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            throw createHttpError(400, "Token and password are required");
        }

        await resetPassword({ token, password });

        res.status(200).json({
            status: 200,
            message: "Password has been successfully reset.",
            data: {},
        });
    } catch (error) {
        if (error.message.includes("Token is expired or invalid")) {
            return next(createHttpError(401, "Token is expired or invalid."));
        }
        if (error.message.includes("User not found")) {
            return next(createHttpError(404, "User not found!"));
        }
        next(error);
    }
};