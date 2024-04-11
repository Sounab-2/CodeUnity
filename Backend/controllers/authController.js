const User = require('../model/User');
const {StatusCodes}= require('http-status-codes');
const customError = require('../errors');

const register = async (req,res) => {
    const {name,email,uid} = req.body;
    if(!name || !email || !uid){
        throw new customError.BadRequestError('Please provide user credentials')
    }
    const user = await User.create({name,email,uid});
    res.status(StatusCodes.CREATED).json({user});
};

const login = async (req,res) => {
    const {email , password} = req.body;

    if(!email || !password){
        throw new customError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({email});
    if(!user) {
        throw new customError.UnauthenticatedError('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new customError.UnauthenticatedError('Invalid credentials'); 
    }

    const tokenUser = {name: user.name, userId: user._id, role: user.role};
    attachCookiesToResponse({res,user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser});
}
// const logout = async (req,res) => {
//     res.cookie('token','logout',{
//         httpOnly: true,
//         expires: new Date(Date.now()),
//     });
//     res.send('user logged out');
// }

const logout = async (req, res) => {
    // Clear the logout cookie
    res.clearCookie('token');

    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });

    
    // Send a response indicating successful logout
    res.send('User logged out');
}




module.exports = {
    register,
    login,
    logout,
}