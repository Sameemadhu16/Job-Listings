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
    <div className="flex flex-col justify-center p-8 ">
      <h2 className="text-3xl font-bold mb-4">Complete your profile</h2>
      <div>
        <form onSubmit={handleSubmit}>
          {formData.role === 'jobPoster' && (
            <div className='w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center p-6'>
              <div className='mb-4'>
                <TextInput type="text" placeholder="Company Name" id="companyname" onChange={handleChange} />
              </div>
              <div className='mb-4'>
                <TextInput type="text" placeholder="Company Website" id="companywebsite" onChange={handleChange} />
              </div>
              <div className='mb-4'>
                <TextInput type="text" placeholder="Biograohy" id="biography" value={formData.biography} onChange={handleChange} required className="w-full p-3 border rounded" />
              </div>
              <div className='mb-4'>
                <TextInput type="text" placeholder="Cover Letter" id="coverletter" value={formData.coverLetter} onChange={handleChange} required className="w-full p-3 border rounded" />
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

          <div className="mb-4 w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center p-6">
            <Button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg">Create Account</Button>
          </div>
        </form>

      </div>



    </div>
  );
};

export default SignUpStep2;
