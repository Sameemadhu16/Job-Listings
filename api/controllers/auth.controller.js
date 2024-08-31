import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const signup = async (req, res, next) => {
    const { username,fullname, email, password, role, mobilenumber,cart,appliedjobs } = req.body;


    if (!username || !fullname || !email || !password || !role || !mobilenumber || username === '' || fullname === '' || email === '' || password === '' || role === ''|| mobilenumber === '') {

        return next(errorHandler(400, 'All feilds are requiired'));
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        fullname,
        password: hashedPassword,
        mobilenumber,
        role,
        cart: role === 'jobSeeker' ? cart : undefined,
        appliedjobs: role === 'jobSeeker' ? appliedjobs : undefined,

    });

    try{
        await newUser.save();
        res.json('Signup successfull');
    } catch (error) {
        next(error);
    }

};
    


export const signin = async (req, res, next) => {
    const { email, password } = req.body;


    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    try{
        const validUser = await User.findOne({ email });
        if(!validUser){
            return next(errorHandler(400,'User not found'));

        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400, 'Invalid Password'));
        }



        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin, }, process.env.JWT_SECRET);



        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token',token,{
            httpOnly: true}).json(rest);
        } catch(error){
         next(error);
    }


};

export const signout= async (req, res, next) => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json('User has been signed out');
    } catch (error) {
      next(error);
    }
  };
