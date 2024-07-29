import React, { useState } from 'react';
import SignUpStep2 from './SignUpStep2';
import { NavLink } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        mobileNumber: '',
        gender: '',
        birthday: '',
    });

    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle final form submission here, e.g., send formData to server or process locally
        console.log(formData);
        // Clear form or perform redirect after successful submission
    };

    return (
        <div className="flex flex-col justify-center p-8">
            {step === 1 && (
                <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
                    <Card className="w-full max-w-md">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create account</h2>
                            <div className="flex gap-2 text-sm mt-4 mb-3">
                                <span>Have an account?</span>
                                <a href="/sign-in" className="font-medium text-blue-500 hover:text-indigo-500">
                                    Sign In
                                </a>
                            </div>
                        </div>
                        <form onSubmit={handleNextStep} className="mt-8 space-y-6">
                            <div className="space-y-4">
                                <div className="flex mb-4">
                                    <Button
                                        className={`flex-1 p-3 border rounded-l-lg mr-2 ${formData.role === 'jobPoster' ? 'px-2 py-1 bg-blue-500 rounded-lg text-white' : 'bg-violet-300 border-blue-500 text-black'}`}
                                        onClick={() => setFormData({ ...formData, role: 'jobPoster' })}
                                    >
                                        Job Poster
                                    </Button>
                                    <Button
                                        className={`flex-1 p-3 border rounded-r-lg ml-2 ${formData.role === 'jobSeeker' ? 'px-2 py-1 bg-blue-500 rounded-lg text-white' : 'bg-violet-300 border-blue-500 text-black'}`}
                                        onClick={() => setFormData({ ...formData, role: 'jobSeeker' })}
                                    >
                                        Job Seeker
                                    </Button>
                                </div>
                                <div>
                                    <Label htmlFor="fullname" value="Your Full Name" />
                                    <TextInput type="text" placeholder="Full Name" id="fullname" name="fullName" onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="username" value="Your Username" />
                                    <TextInput type="text" placeholder="Username" id="username" name="username" onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="email" value="Your Email" />
                                    <TextInput type="text" placeholder="Email" id="email" name="email" onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="password" value="Your Password" />
                                    <TextInput type="password" placeholder="**********" id="password" name="password" onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="mobilenumber" value="Your Mobile Number" />
                                    <TextInput type="text" placeholder="Mobile Number" id="mobilenumber" name="mobileNumber" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded"
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4 rounded-lg">
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <Button type="submit" className="flex-justify-center w-20 bg-blue-500 text-white rounded">Next</Button>
                        </div>

                    </form>

                    <p className="text-center mb-4 mt-2">OR</p>
                    <div className="flex justify-center">
                        <button className=" p-3 border rounded mx-2">Sign up with Google</button>
                    </div>
                </div>
            )}
            {step === 2 && <SignUpStep2 formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />}
            <div className="flex lg:w-1/2 bg-cover bg-center items-center justify-center p-6 lg:p-12" style={{ backgroundImage: `url(https://img.freepik.com/free-photo/copy-space-blank-commercial-advertisement_53876-121262.jpg?t=st=1721500082~exp=1721503682~hmac=84ee8a13f47eef8a6ff863cfd1ec73b8c03072111099630aafb8d00e04250362&w=740)` }}>
            </div>
        </div>
    );
};

export default SignUp;
