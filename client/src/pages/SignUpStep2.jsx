import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';

const SignUpStep2 = ({ formData, setFormData, handleSubmit }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-center p-8">
            <div className="md:w-1/2 flex flex-col justify-center p-6 py-6">
                <h2 className="text-3xl font-bold mb-4">Complete your profile</h2>
                <form onSubmit={handleSubmit}>
                    {formData.role === 'jobPoster' && (
                        <div>
                            <div className='mb-4'>
                                <Label value="Your Company Name" />
                                <TextInput type="text" placeholder="Company Name" id="companyname" name="companyName" value={formData.companyName} onChange={handleChange} />
                            </div>
                            <div className='mb-4'>
                                <Label value="Your Company Website" />
                                <TextInput type="text" placeholder="Company Website" id="companywebsite" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} />
                            </div>
                            <div className='mb-4'>
                                <Label value="Biography" />
                                <TextInput type="text" placeholder="Biography" id="biography" name="biography" value={formData.biography} onChange={handleChange} required className="w-full p-3 border rounded"/>
                            </div>
                            <div className='mb-4'>
                                <Label value="Cover Letter" />
                                <TextInput type="text" placeholder="Cover Letter" id="coverletter" name="coverLetter" value={formData.coverLetter} onChange={handleChange} required className="w-full p-3 border rounded"/>
                            </div>
                        </div>
                    )}
                    {formData.role === 'jobSeeker' && (
                        <div>
                            <div className="mb-4">
                                <TextInput
                                    type="file"
                                    name="resume"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <TextInput
                                    type="text"
                                    name="skills"
                                    placeholder="Skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded"
                                />
                            </div>
                        </div>
                    )}
                    <div className="mb-4 flex items-center">
                        <TextInput
                            type="checkbox"
                            name="terms"
                            required
                            className="mr-2"
                        />
                        <Label>
                            I've read and agree with your terms and conditions
                        </Label>
                    </div>    
                </form>
                <div className="mb-4">
                        <Button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg mt-20">Create Account</Button>
             </div>
            </div>
            <div className="md:w-1/2 p-6 flex justify-center">
                <img src="https://img.freepik.com/free-photo/copy-space-blank-commercial-advertisement_53876-121262.jpg?t=st=1721500082~exp=1721503682~hmac=84ee8a13f47eef8a6ff863cfd1ec73b8c03072111099630aafb8d00e04250362&w=740" alt="Sign Up Illustration" className="w-full h-fit shadow-md"/>
            </div>
            
        </div>
    );
};

export default SignUpStep2;
