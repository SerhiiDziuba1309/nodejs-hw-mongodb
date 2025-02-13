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
                refreshToken: session.refreshToken
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
export const requestResetEmailController = async(req, res) =>{
    await requestResetToken(req.body.email);
    res.json({
        message: 'Reset password email was successfully sent',
        status: 200,
        data: {},
    });
}
export const resetPasswordController = async(req,res)=>{
    await resetPassword(req.body);
    res.json({
        message:'Password was successfully reset!',
        status: 200,
        data: {},
    })
} 