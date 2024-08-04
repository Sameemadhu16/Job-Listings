import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput, Card, Alert, Spinner } from 'flowbite-react';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


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
    <div className="flex min-h-screen flex-col lg:flex-row bg-gray-100">
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md">
          <div className="text-center">  
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="sign-up" className="font-medium text-blue-500 hover:text-indigo-500">
                Create Account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6"  method="POST" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email-address" value="Email address"  />
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="password" value="Password" />
                <TextInput
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <Button className='bg-blue-500' type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </Card>
      </div>
      <div className="flex lg:w-1/2 bg-cover bg-center items-center justify-center p-6 lg:p-12" style={{ backgroundImage: `url(https://img.freepik.com/free-photo/copy-space-blank-commercial-advertisement_53876-121262.jpg?t=st=1721500082~exp=1721503682~hmac=84ee8a13f47eef8a6ff863cfd1ec73b8c03072111099630aafb8d00e04250362&w=740)` }}>
      </div>
    </div>
  );
};

export default SignIn;
