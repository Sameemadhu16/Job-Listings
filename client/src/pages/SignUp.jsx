import React, { useState } from 'react';
import SignUpStep2 from './SignUpStep2';

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
        <div className="flex h-screen font-sans">
            {step === 1 && (
                <div className="w-full flex flex-col justify-center p-6 gap-0">
                    <h2 className="text-3xl font-bold mb-4">Create account.</h2>
                    <p className="mb-4">Already have an account? <a href="/login" className="text-blue-500">Log In</a></p>
                    <form onSubmit={handleNextStep} className='flex flex-col' >
                        <div className="flex mb-4">
                            <button
                                type="button"
                                className={`flex-1 p-3 border rounded-l-lg ${formData.role === 'jobPoster' ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-gray-100'}`}
                                onClick={() => setFormData({ ...formData, role: 'jobPoster' })}
                            >
                                Job Poster
                            </button>
                            <button
                                type="button"
                                className={`flex-1 p-3 border rounded-r-lg ${formData.role === 'jobSeeker' ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300 bg-gray-100'}`}
                                onClick={() => setFormData({ ...formData, role: 'jobSeeker' })}
                            >
                                Job Seeker
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
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
                        <div className="mb-4">
                            <input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                name="terms"
                                required
                                className="mr-2"
                            />
                            <label htmlFor="terms">
                                I've read and agree with your <a href="/terms" className="text-blue-500">Terms of Services</a>
                            </label>
                        </div>
                        <div className="mb-4">
                            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">Next</button>
                        </div>
                    </form>
                    <p className="text-center mb-4">OR</p>
                    <div className="flex justify-center">
                        <button className="p-3 border rounded mx-2">Sign up with Google</button>
                    </div>
                </div>
            )}
            {step === 2 && <SignUpStep2 formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />}
        </div>
    );
};

export default SignUp;
