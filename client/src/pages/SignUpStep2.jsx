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
        <div className="w-full flex flex-col justify-center p-8">
            <h2 className="text-3xl font-bold mb-4">Complete your profile</h2>
            <form onSubmit={handleSubmit}>
                {formData.role === 'jobPoster' && (
                    <>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="companyWebsite"
                                placeholder="Company Website"
                                value={formData.companyWebsite}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                name="biography"
                                placeholder="Biography"
                                value={formData.biography}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                name="coverLetter"
                                placeholder="Cover Letter"
                                value={formData.coverLetter}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                    </>
                )}

                {formData.role === 'jobSeeker' && (
                    <>
                        <div className="mb-4">
                            <input
                                type="file"
                                name="resume"
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="skills"
                                placeholder="Skills"
                                value={formData.skills}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded"
                            />
                        </div>
                    </>
                )}
                <div className="mb-4">
                    <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">Create Account</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpStep2;
