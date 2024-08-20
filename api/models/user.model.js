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

    },
    birthday: {
        type: String,
    },
    maritalStatus: {
        type: String,
        enum: ['married', 'unmarried'],
    },
 
  //Feild specific to job posters
    companyName: {
        type: String,
        required: function () {
            return this.role === 'jobPoster';
        }

    },

    biography: {
        type: String,
        default: "I've been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces...",
        required: function () {
            return this.role === 'jobPoster';

        }
    },
    coverLetter: {
        type: String,
        default: "Dear ABC?",
        required: function () {
            return this.role === 'jobPoster';
        }
    },

    //Feild specific to job seeker
    cv: {
        type: String,

    },

    skills: {
        type: [String],
        required: function () {
            return this.role === 'jobSeeker';
        }


    },

    cart: {
        type: [String],


    },
    appliedjobs: {
        type: [String],


    }
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;