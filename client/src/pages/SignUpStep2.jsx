import React from 'react';
import { Button, Label, TextInput, Card } from 'flowbite-react';

const SignUpStep2 = ({ formData, setFormData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-gray-100">
      <div className='flex flex-1 items-center justify-center p-6 sm:p-12'>
        <Card className="w-full max-w-md ">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Complete your profile</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/sign-in" className="font-medium text-blue-500 hover:text-indigo-500">
                Sign In
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {formData.role === 'jobPoster' && (
                <>
                  <div>
                    <Label htmlFor="companyName" value="Your Company Name" />
                    <TextInput
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="Company Name"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="companyWebsite" value="Your Company Website" />
                    <TextInput
                      id="companyWebsite"
                      name="companyWebsite"
                      type="text"
                      placeholder="Company Website"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="biography" value="Biography" />
                    <TextInput
                      id="biography"
                      name="biography"
                      type="text"
                      placeholder="Biography"
                      value={formData.biography}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="coverLetter" value="Cover Letter" />
                    <TextInput
                      id="coverLetter"
                      name="coverLetter"
                      type="text"
                      placeholder="Cover Letter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              {formData.role === 'jobSeeker' && (
                <>
                  <div>
                    <Label htmlFor="resume" value="Add Your CV" />
                    <TextInput
                      id="resume"
                      name="resume"
                      type="file"
                      onChange={handleChange}
                      required
                      className="relative w-full p-1 border rounded bg-blue-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skills" value="Skills" />
                    <TextInput
                      id="skills"
                      name="skills"
                      type="text"
                      placeholder="Skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      className="relative w-full p-1 border rounded bg-blue-200"
                    />
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="gender" value="Select Gender" />
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded bg-gray-300"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="birthday" value="Birthday" />
                <TextInput
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={formData.birthday}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded bg-gray-300"
                />
              </div>
              <div className="flex items-center">
                <TextInput id="terms" name="terms" type="checkbox" required className="mr-2 focus:outline-white" />
                <Label htmlFor="terms">
                  I've read and agree with your{' '}
                  <a href="#" className="text-blue-500 hover:text-indigo-500">
                    terms and conditions
                  </a>
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </Card>
      </div>

      <div
        className="flex lg:w-1/2 bg-cover bg-center items-center justify-center p-6 lg:p-12"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/copy-space-blank-commercial-advertisement_53876-121262.jpg?t=st=1721500082~exp=1721503682~hmac=84ee8a13f47eef8a6ff863cfd1ec73b8c03072111099630aafb8d00e04250362&w=740)`
        }}>
      </div>
    </div>

  );
};

export default SignUpStep2;
