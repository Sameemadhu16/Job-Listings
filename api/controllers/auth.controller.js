import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

<<<<<<< HEAD

export const signup = async (req, res, next) => {
    const { username, fullname, email, password, role, gender, mobileNumber, birthday, maritalStatus, experience, education, biography, coverLetter, cv, skills, companyName } = req.body;

<<<<<<< HEAD
<<<<<<< HEAD
    if (!username || !fullname || !email || !password || !role || username === '' || fullname === '' || email === '' || password === '' || role === '') {

=======
export const signup = async (req, res, next) => {
    const { username, email, password, role, gender, mobileNumber, birthday, maritalStatus, experience, education, biography, coverLetter, resume, skills, companyName } = req.body;

<<<<<<< HEAD
    if (!username || !fullname || !email || !password || !role || username === '' || fullname === '' || email === '' || password === '' || role === '') {
>>>>>>> 3502724 (create signin in auth controller)
=======
    if (!username || fullname || !email || !password || !role || username === '' || fullname === '' || email === '' || password === '' || role === '') {
>>>>>>> 0be260c (create sign in api route)
=======
    if (!username || !fullname || !email || !password || !role || username === '' || fullname === '' || email === '' || password === '' || role === '') {
>>>>>>> 766004c (create signin in auth controller)
=======
    if (!username || fullname || !email || !password || !role || username === '' || fullname === '' || email === '' || password === '' || role === '') {
>>>>>>> 1153696 (create sign in api route)
        return next(errorHandler(400, 'All feilds are requiired'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

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
        cv: role === 'jobSeeker' ? cv : undefined,
        skills: role === 'jobSeeker' ? skills : undefined,
    });

    try {
        await newUser.save();
        res.json('Signup successfull');
    } catch (error) {
        next(error);
    }

};
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0be260c (create sign in api route)

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }
<<<<<<< HEAD

    try {

        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(400, 'User not found'));

=======
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, 'User not found'));
>>>>>>> 0be260c (create sign in api route)
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid Password'));
        }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin, isModerator: validUser.isModerator }, process.env.JWT_SECRET);

=======
        const token = jwt.sign({ id: validUser._id, isAdmin:validUser.isAdmin, isModerator:validUser.isModerator}, process.env.JWT_SECRET);
>>>>>>> f424d68 (update moderator in user model)
=======
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);
>>>>>>> 0be260c (create sign in api route)
=======
        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin, isModerator: validUser.isModerator }, process.env.JWT_SECRET);
>>>>>>> 766004c (create signin in auth controller)

        const { password: pass, ...rest } = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }
<<<<<<< HEAD
<<<<<<< HEAD


};

=======
>>>>>>> 3502724 (create signin in auth controller)
=======
}
>>>>>>> 0be260c (create sign in api route)
=======
};
>>>>>>> 766004c (create signin in auth controller)
=======
>>>>>>> 1153696 (create sign in api route)
