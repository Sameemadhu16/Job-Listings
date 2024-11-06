import React, { useState } from 'react';
import {  Spinner } from 'flowbite-react';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Jobpilot.png';


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading } = useSelector((state) => state.user);
  const [errorMessage,setErrorMessage] = useState('')
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
        return setErrorMessage('All feilds are required')
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
        
        
        if(data.role === 'jobPoster'){
            navigate('/poster-dashboard?tab=profile');
        }else{
            navigate('/');
        }
            
        }

        if(!res.ok){
            dispatch(signInFailure(data));
            setErrorMessage(data.message)
        }
    } catch (error) {
        dispatch(signInFailure(error.message));
        setErrorMessage(error.message);
    }
}

    return (
        <div className='min-h-screen bg-gray-100 dark:bg-slate-700 flex items-center justify-center'>
            

                    <div className='flex flex-col dark:bg-slate-600 lg:flex-row justify-center items-center w-3/4  rounded-lg shadow-lg'>
                        <div className='w-1/2 dark:bg-slate-600 dark:text-black bg-white p-8 z-10 rounded-lg rounded-r-none'>
                            <div className="max-w-md dark:text-white">
                                <div className="">
                                    <img src={logo} alt="Logo" className="h-28 rounded-full" />
                                </div>
                                <div className='text-start'>
                                    <h2 className="text-3xl font-bold font-sans">Welcome Back</h2>
                                    <p className="text-gray-500 dark:text-gray-300 mb-4 text-sm">Simplify Your Job Search and Find the Perfect Opportunity</p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className='w-full mb-6' >
                            
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
                            <div className="text-center mt-4">
                                <p className="text-gray-600 dark:text-gray-300">
                                    Create an new Account{' '}
                                    <a href="/sign-up" className="text-blue-500 font-semibold hover:underline">
                                        Create an Account
                                    </a>
                                </p>
                            </div>
                        </div>
                    <div className="hidden md:block w-1/2 items-center justify-center h-auto">
                            <div className="text-center -mt-6 items-start rounded-lg">
                                <img
                                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/49bcfd78364175.5ca3009cb692f.gif"
                                    alt="Illustration"
                                    className="mx-auto w-full rounded-lg"
                        />
                            </div>
                    </div>
                </div>

                    
            
        </div>
  );
};

export default SignIn;