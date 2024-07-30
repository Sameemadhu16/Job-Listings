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
        profilePicture: {
            type: String,
            default:
              'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          },
          isAdmin: {
            type : Boolean,
            default: false,
          },

          isModerator: {
            type : Boolean,
            default: false,
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
        cv: {
            type: String,
            required: function() {
                return this.role === 'jobSeeker';
            }
        },
            
        skills: {
            type: [String],
            required: function(){
                return this.role === 'jobSeeker';
            }
       

        },
        cart: {
            type: [String],
            
       
        },
        appliedJobs: {
            type: [String],
            

        }
    },
    {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;