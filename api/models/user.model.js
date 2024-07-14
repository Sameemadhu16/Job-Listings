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

        gender: {
            type: String,
        },
        mobileNumber: {
            type: String,
        },
        birthday: {
            trpe: String,
        },
        maritalStatus: {
            type: String,
            enum: ['married', 'unmarried'],
        },
        experience: {
            type : String,
        },

        //Feild specific to job posters
        companyName: {
            type: String,
            required : function(){
                return this.role === 'jobPoster';
            }
            
        },
        
        biography: {
            type: String,
            required : function(){
                return this.role === 'jobPoster';
            }
        },
        coverLetter: {
            type: String,
            required : function (){
                return this.role === 'jobPoster';
            }
        },

        //Feild specific to job seeker
        resume: {
            type: String,
            required: function(){
                return this.role === 'jobSeeker'; 
            }
        },
            
        skills: {
            type: [String],
            required: function(){
                return this.role === 'jobSeeker';
            }
       
        },
    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;