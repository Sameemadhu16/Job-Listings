import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
import logo from '../images/Jobpilot.png';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        role: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation to check if all fields are filled
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.mobileNumber || !formData.role) {
            return setErrorMessage('Please fill out all fields');
        }

        // Password confirmation check
        if (formData.password !== formData.confirmPassword) {
            return setErrorMessage('Passwords does not match');
        }

        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setLoading(false);

            if (data.success === false) {
                return setErrorMessage(data.message);
            }

            if (res.ok) {
                navigate('/sign-in');
            }

        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 flex'>
            <div className="w-full md:w-1/2 bg-white p-10 m-20 mr-16 flex flex-col justify-center rounded-lg shadow-lg">
                <div className="max-w-md mx-auto">
                    <div className="mb-6">
                        <img src={logo} alt="Logo" className="h-20" />
                    </div>
                    <div className='text-start'>
                        <h2 className="text-3xl font-bold font-sans">Create an Account</h2>
                        <p className="text-gray-500 mb-6">Simplify Your Job Search and Find the Perfect Opportunity</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md"
                            placeholder="Name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md"
                            placeholder="Mobile Number"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            id="role"
                            name="role"
                            className="w-full py-2 px-4 border border-gray-300 rounded-md"
                            onChange={handleChange}
                        >
                            <option value="">Select Role</option>
                            <option value="jobSeeker">Find job</option>
                            <option value="jobPoster">Post job</option>
                        </select>
                    </div>

                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md font-semibold transition duration-300 ease-in-out ${
                            loading ? 'cursor-not-allowed opacity-75' : 'hover:bg-blue-600'
                        }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Spinner size="sm" />
                                <span className="pl-3">Loading...</span>
                            </div>
                        ) : (
                            'Register'
                        )}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <a href="/sign-in" className="text-blue-500 font-semibold hover:underline">
                            Log In
                        </a>
                    </p>
                </div>
            </div>

            <div className="hidden md:block w-1/2 items-center justify-center mr-24 mt-36">
                <div className="text-center">
                    <img
                        src="https://news.umanitoba.ca/wp-content/uploads/2021/11/Career-Month-3-UM-Today--1200x799.png"
                        alt="Illustration"
                        className="mx-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
