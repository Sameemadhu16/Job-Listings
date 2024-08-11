import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },

        fullname: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ['jobPoster', 'jobSeeker'],
            required: true,
        },
        mobilenumber: {
            type: String,
            required: true,
        },
        
        isAdmin: {
            type : Boolean,
            default: false,
        },

        cart: {
            type: [String],
        },
        
        appliedjobs: {
            type: [String],
        }
    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;