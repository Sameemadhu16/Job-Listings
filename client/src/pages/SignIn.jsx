import React, { useState } from 'react';
import { Spinner } from 'flowbite-react';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Jobpilot.png';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { loading } = useSelector((state) => state.user);
    const [errorMessage, setErrorMessage] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            return setErrorMessage('All fields are required');
        }

        // Password confirmation check
        if (formData.password !== formData.confirmPassword) {
            return setErrorMessage('Passwords do not match');
        }

        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok || data.success === false) {
                throw new Error(data.message || 'Something went wrong');
            }

            dispatch(signInSuccess(data));

            // Navigate based on user role
            if (data.role === 'jobPoster') {
                navigate('/poster-dashboard?tab=profile');
            } else {
                navigate('/');
            }

        } catch (error) {
            dispatch(signInFailure(error.message));
            setErrorMessage(error.message);
            
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 dark:bg-slate-700 flex items-center justify-center'>
            <div className="w-3/4 bg-white dark:bg-slate-800 p-10 m-20 mr-16 flex flex-col justify-center rounded-lg shadow-lg">
                <div className='flex flex-col lg:flex-row justify-center items-center gap-5'>
                    <div className='justify-center items-center'>
                        <div className="max-w-md">
                            <img src={logo} alt="Logo" className="h-28" />
                            <div className='text-start'>
                                <h2 className="text-3xl font-bold font-sans dark:text-white">Welcome Back</h2>
                                <p className="text-gray-500 dark:text-slate-200 mb-4 text-sm">Simplify Your Job Search and Find the Perfect Opportunity</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className='w-full mb-6'>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md text-black"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md text-black"
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md text-black"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                />
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
                                    'Login'
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="hidden md:block w-1/2 items-center justify-center">
                        <div className="text-center">
                            <img
                                src="https://news.umanitoba.ca/wp-content/uploads/2021/11/Career-Month-3-UM-Today--1200x799.png"
                                alt="Illustration"
                                className="mx-auto rounded-lg shadow-lg w-3/4"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="text-gray-600 dark:text-slate-200">
                        Create a new Account{' '}
                        <a href="/sign-up" className="text-blue-500  font-semibold hover:underline">
                            Create an Account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
