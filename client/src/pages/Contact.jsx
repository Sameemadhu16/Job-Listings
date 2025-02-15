import React, { useState } from 'react';
import { FaQuestionCircle, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

export default function Contact() {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [formStatus, setFormStatus] = useState(''); // State to handle form submission status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const serviceId = 'service_yt21wmj';
    const templateId = 'template_otwk3vs';
    const publicId = 'MeDCdS9kWidDEbOSA';

    const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicId,
        template_params: {
            from_name: formData.name,
            from_email: formData.email,
            to_name: 'ishan',
            message: formData.message,
        },
    };

    try {
      const response = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        data,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

        if (response.status === 200) { // Check if the response status is 200 (OK)
            setFormStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Clear form after successful submission
        } else {
            setFormStatus('error');
        }
    } catch (error) {
        console.error('Error submitting the form:', error);
        setFormStatus('error');
    }
};

   //console.log(formData);
   
  return (
    <div className="bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen py-10">
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center mb-8  text-blue-800 ">
          Customer Support
        </h1>
        
        <p className="text-center text-lg mb-10">
          Need help? Our support team is here to assist you. Browse our FAQs or reach out to us via the contact form.
        </p>

        <div className="space-y-12">
          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center text-blue-800 ">
              <FaQuestionCircle className="text-blue-800  mr-2" /> Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4">
              {/* FAQ Item */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleQuestion(1)}
                >
                  <h3 className="text-lg font-bold">How do I apply for a job on Job Listings?</h3>
                  <span>{openQuestion === 1 ? '-' : '+'}</span>
                </div>
                {openQuestion === 1 && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300 animate-fade-in">
                    Applying for a job is easy! Once you find a job that interests you, click on the "Apply" button and follow the instructions to submit your application.
                  </p>
                )}
              </div>

              {/* FAQ Item */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleQuestion(2)}
                >
                  <h3 className="text-lg font-bold">How do I post a job as an employer?</h3>
                  <span>{openQuestion === 2 ? '-' : '+'}</span>
                </div>
                {openQuestion === 2 && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300 animate-fade-in">
                    To post a job, create an account as an employer and use the "Post a Job" option on your dashboard. You can add job details, requirements, and set an application deadline.
                  </p>
                )}
              </div>

              {/* FAQ Item */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div 
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleQuestion(3)}
                >
                  <h3 className="text-lg font-bold">Can I track the status of my application?</h3>
                  <span>{openQuestion === 3 ? '-' : '+'}</span>
                </div>
                {openQuestion === 3 && (
                  <p className="mt-2 text-gray-700 dark:text-gray-300 animate-fade-in">
                    Yes! Once you've applied for a job, you can track the status of your application through your personal dashboard under the "Applications" tab.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center text-blue-800 ">
              <FaEnvelope className="mr-2" /> Contact Us
            </h2>

            {/* Contact Form */}
            <form className="space-y-4 " onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black dark:text-white">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="p-3 border border-gray-300 dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="p-3 border border-gray-300  dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              />
              <div className=''>
              <button
                type="submit"
                className=" bg-blue-500 text-white py-2 w-full rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
              </div>
            </form>

            {/* Success/Error Message */}
            {formStatus === 'success' && (
              <p className="mt-4 text-center text-green-500">Thank you for reaching out! We will get back to you soon.</p>
            )}
            {formStatus === 'error' && (
              <p className="mt-4 text-center text-red-500">Please fill in all fields before submitting.</p>
            )}
          </div>

          {/* Other Contact Information */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
              <FaPhone className="mr-2" /> Reach Us
            </h2>
            <div className="space-y-4 text-center">
              <p className="flex items-center justify-center text-lg">
                <FaPhone className="mr-2" /> +94 111 111 111
              </p>
              <p className="flex items-center justify-center text-lg">
                <FaMapMarkerAlt className="mr-2" /> 1234 Job Listings Street, Colombo, Sri Lanka
              </p>
              <p className="flex items-center justify-center text-lg">
                <FaEnvelope className="mr-2" /> support@joblistings.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
