import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Card, Alert, Spinner } from 'flowbite-react';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Jobpilot.png';


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'))
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex'>
            <div className="w-full md:w-1/2 bg-white p-10 m-20 mr-16 flex flex-col justify-center rounded-lg shadow-lg">
                <div className="max-w-md mx-auto">
                    <div className="mb-6">
                        <img src={logo} alt="Logo" className="h-20" />
                    </div>
                    <div className='text-start'>
                        <h2 className="text-3xl font-bold font-sans">Welcome Back</h2>
                        <p className="text-gray-500 mb-6">Simplify Your Job Search and Find the Perfect Opportunity</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

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
                        Create an new Account{' '}
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

export default SignIn;
