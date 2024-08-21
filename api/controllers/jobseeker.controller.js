import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const updateSeeker = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 5) {
      return next(errorHandler(400, "Password must be at least 6 charaters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 5 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 5 and 20 characters')
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    const updatedSeeker = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          fullname: req.body.fullname,
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
          mobileNumber: req.body.mobileNumber
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedSeeker._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteSeeker = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
}

export const seekerSignout = async (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('Seeker has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getJobSeekers = async (req, res, next) => {

  //check jobseeker true or false
  try {
    const jobseeker = await User.find({ role: 'jobSeeker' })

    const usersWithoutPassword = jobseeker.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments({ role: 'jobSeeker' });

    res.status(200).json({
      jobseeker: usersWithoutPassword,
      totalUsers,
    });

  } catch (error) {
    next(error)
  }
}

export const getJobSeekerByID = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.user)

  try {
    const jobseeker = await User.findById(req.user.id);

    if (jobseeker.role != "jobSeeker") {
      return next(404, "job seeker not found");
    }
    const { password, ...rest } = jobseeker._doc;
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }

}