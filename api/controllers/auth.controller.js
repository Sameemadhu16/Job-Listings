import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req , res, next) => {
    const { username, email, password, role,gender, mobileNumber, birthday, maritalStatus, experience,education,biography,coverLetter,resume,skills,companyName} = req.body;

    if (!username ||fullname || !email || !password || !role || username === '' || fullname === ''|| email === '' || password === ''|| role === ''){
        return next(errorHandler(400, 'All feilds are requiired'));
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        fullname,
        password: hashedPassword,
        gender,
        mobileNumber,
        birthday,
        maritalStatus,
        experience,
        education,
        role,
        companyName: role === 'jobPoster' ? companyName : undefined,
        biography: role === 'jobPoster' ? biography : undefined,
        coverLetter: role === 'jobPoster' ? coverLetter : undefined,
        resume: role === 'jobSeeker' ? resume : undefined,
        skills: role === 'jobSeeker' ? skills : undefined,
    });

    try{
        await newUser.save();
        res.json('Signup successfull');
    } catch (error) {
        next(error);
    }

    };
    