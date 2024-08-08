import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput, Card ,Alert, Spinner} from 'flowbite-react';



const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]:e.target.value.trim()})
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.role)
        if (!formData.fullname || !formData.username || !formData.email || !formData.password || !formData.mobilenumber || !formData.role) {
          return setErrorMessage('Please fill out all fields');
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
          if (data.success === false) {
            setLoading(false);
            return setErrorMessage(data.message);
          }
          setLoading(false);
          if (res.ok) {
            navigate('/sign-in');
          }
        } catch (error) {
             setErrorMessage('An error occurred. Please try again.');
             setLoading(false);
        }
      };

    return (
        <div className="flex min-h-screen flex-col lg:flex-row bg-gray-100">
                <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
                    <Card className="w-full max-w-md">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create account</h2>
                            <div className="flex gap-2 text-sm mt-4 mb-3">
                                <span>Have an account?</span>
                                <a href="/sign-in" className="font-medium text-blue-500 hover:text-indigo-500 hover:underline">
                                    Sign In
                                </a>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className=" space-y-6">
                            <div className="space-y-4">
                                <div className="flex mb-4">
                                    <Button
                                        className={`flex-1 p-3 border rounded-l-lg mr-2 hover:text-white ${formData.role === 'jobPoster' ? ' bg-blue-500 rounded-lg text-white focus:outline-white' : 'bg-blue-200 border-blue-500 text-blue-700'}`}
                                        onClick={() => setFormData({ ...formData, role: 'jobPoster' })}
                                    >
                                        Job Poster
                                    </Button>
                                    <Button
                                        className={`flex-1 p-3 border rounded-r-lg ml-2 hover:text-white ${formData.role === 'jobSeeker' ? ' bg-blue-500 rounded-lg text-white focus:outline-white' : 'bg-blue-200 border-blue-500 text-blue-700'}`}
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
                                    <TextInput type="email" placeholder="Email" id="email" name="email" onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="password" value="Your Password" />
                                    <TextInput type="password" placeholder="**********" id="password" name="password" onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="mobilenumber" value="Your Mobile Number" />
                                    <TextInput type="text" placeholder="Mobile Number" id="mobilenumber" name="mobilenumber" onChange={handleChange} />
                                </div>
                            </div>
                            <Button className="bg-blue-500" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner size="sm" />
                                        <span className="pl-3">Loading...</span>
                                    </>
                                    ) : (
                                        'Create Account'
                                    )}
                            </Button>
                            
                            
                            
                        </form>
                    </Card>
                    {errorMessage && (
                        <Alert className="mt-5" color="failure">
                        {errorMessage}
                        </Alert>
                    )}
                </div>
            
            <img className='lg:h-screen mt-12 mr-10 rounded-lg sm:h-20' src="https://img.freepik.com/free-photo/copy-space-blank-commercial-advertisement_53876-121262.jpg?t=st=1721500082~exp=1721503682~hmac=84ee8a13f47eef8a6ff863cfd1ec73b8c03072111099630aafb8d00e04250362&w=740" alt="" />
        </div>
    );
};

export default SignUp;
