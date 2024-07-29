import React from 'react';
import { Button, Checkbox, Label, TextInput, Card } from 'flowbite-react';

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gray-100">
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md">
          <div className="text-left">  
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Forget Password</h2>
            <p className="mt-2 text-sm text-gray-600">
              Go back to?{' '}
              <a href="sign-in" className="font-medium text-blue-500 hover:text-indigo-500 hover:underline">
                  Sign in
              </a>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Don't have account?{' '}
              <a href="sign-up" className="font-medium text-blue-500 hover:text-indigo-500 hover:underline">
                  Create account
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email-address" value="Email address" />
                <TextInput
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  
                />
              </div>
              
            </div>
            
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
            <div className="flex items-center justify-center mt-6">
              <div className="border-t border-gray-300 flex-1"></div>
              <p className="px-3 text-sm text-gray-600">or</p>
              <div className="border-t border-gray-300 flex-1"></div>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              
              <Button outline>
                <img src="/path/to/google-logo.png" alt="Sign in with Google" className="h-5 w-5" />
                <span className="ml-2">Sign in with Google</span>
              </Button>
            </div>
          </form>
        </Card>
      </div>
      <div className="flex lg:w-1/2 bg-cover bg-center items-center justify-center p-6 lg:p-12" style={{ backgroundImage: `url(https://img.freepik.com/free-photo/copy-space-blank-commercial-advertisement_53876-121262.jpg?t=st=1721500082~exp=1721503682~hmac=84ee8a13f47eef8a6ff863cfd1ec73b8c03072111099630aafb8d00e04250362&w=740)` }}>
      </div>
    </div>
  );
};

export default ForgotPassword;
