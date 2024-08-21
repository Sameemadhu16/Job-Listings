import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const getJobPosters = async (req, res, next) => {


    //check jobposter true or false

    try {
        const jobposter = await User.find({ role: 'jobPoster' })

        const usersWithoutPassword = jobposter.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments({ role: 'jobPoster' });

        res.status(200).json({
            jobposter: usersWithoutPassword,
            totalUsers,
        });

    } catch (error) {
        next(error)
    }
}

export const getJobPosterByID = async (req, res, next) => {
    const { id } = req.params;
    console.log(req.user)

    try {
        const jobposter = await User.findById(req.user.id);

        if (jobposter.role != "jobPoster") {
            return next(404, "job poster not found");
        }
        const { password, ...rest } = jobposter._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }

}



export const updateJobposter = async (req, res, next) => {


    const updateData = req.body;
    console.log(req.body);
    


    try {
        const updatedJobPoster = await User.findByIdAndUpdate(req.user.id,

            {
                $set: updateData,
            }, { new: true }

        );
        if (!updatedJobPoster || updatedJobPoster.role !== 'jobPoster') {
            return next(errorHandler(404, 'Job poster not found'));
        }

        const { password, ...rest } = updatedJobPoster._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}


export const deleteJobposter = async (req, res, next) => {
    if (!req.user.role == "jobPoster" && req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this user"))
    }

    try {
        await User.findByIdAndDelete(req.params.userId);

        res.status(200).json({ message: "Jobposter delete Successfully" })

    } catch (error) {
        next(error)
    }

}