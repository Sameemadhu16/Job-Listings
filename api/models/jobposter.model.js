import mongoose from 'mongoose';

const jobposterSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique: true,

    },
    email:{
        type: String,
        required: true,
        unique: true,

    },
    password:{
        type: String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },

    webSite: {
        type: String,
        required: true,
        default:"ishan.lk",
    },

    dateOfBirth: {
        type: Date,
        required: true,
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'Widowed'],
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,

        //should add validation

        // validate: {
        //     validator: function(v) {
        //         return /\d{10}/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        //     }
}

},{timestamps:true}
);

const Jobposter = mongoose.model("JobPoster",jobposterSchema);
export default Jobposter;

// As I think we should add discription and cover letter for this model
//It should be add later