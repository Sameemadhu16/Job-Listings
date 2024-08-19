import React, { useState } from 'react';
import { FaUsers, FaBriefcase, FaBullseye } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function About() {
  const [isSeekerOpen, setSeekerOpen] = useState(true);
  const [isPosterOpen, setPosterOpen] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen py-10">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center mb-8 animate-pulse">About Job Pilot</h1>
        
        {/* Introduction */}
        <p className="text-center text-lg mb-8">
          Welcome to <span className="font-semibold">Job Pilot</span>! Your trusted platform for connecting <span className="font-semibold">Job Seekers</span> and <span className="font-semibold">Job Posters</span> in an easy-to-use, feature-rich environment.
        </p>

        {/* Interactive sections */}
        <div className="space-y-6">
          
          {/* Job Seekers Section */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => setSeekerOpen(!isSeekerOpen)}
            >
              <h2 className="text-2xl font-bold flex items-center">
                <FaUsers className="mr-2" /> For Job Seekers
              </h2>
              <span>{isSeekerOpen ? '-' : '+'}</span>
            </div>
            {isSeekerOpen && (
              <p className="mt-4 text-lg leading-7 animate-fade-in">
                As a job seeker, you can explore a wide range of job postings tailored to your skills and preferences. Our system allows you to easily apply for jobs with just a few clicks. Track your applications, update your profile, and stay informed about new opportunities in real time.
              </p>
            )}
          </div>

          {/* Job Posters Section */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => setPosterOpen(!isPosterOpen)}
            >
              <h2 className="text-2xl font-bold flex items-center">
                <FaBriefcase className="mr-2" /> For Job Posters
              </h2>
              <span>{isPosterOpen ? '-' : '+'}</span>
            </div>
            {isPosterOpen && (
              <p className="mt-4 text-lg leading-7 animate-fade-in">
                Job Pilot provides an easy-to-use platform for job posters to post vacancies, manage applications, and connect with top talent. Whether you are a startup or a large company, our system simplifies finding the right candidates.
              </p>
            )}
          </div>

          {/* Mission Section */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold flex items-center">
              <FaBullseye className="mr-2" /> Our Mission
            </h2>
            <p className="mt-4 text-lg leading-7 animate-fade-in">
              At Job Pilot, we strive to bridge the gap between employers and job seekers. Our mission is to provide a platform that empowers individuals to achieve their career goals while helping companies find the talent they need for success.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold flex items-center">
              <AiOutlineCheckCircle className="mr-2" /> Why Choose Job Pilot?
            </h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center space-x-2 hover:text-blue-500 transition duration-300">
                <AiOutlineCheckCircle className="text-green-500" />
                <span>Seamless job application process for job seekers</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-blue-500 transition duration-300">
                <AiOutlineCheckCircle className="text-green-500" />
                <span>Efficient job posting and applicant management for employers</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-blue-500 transition duration-300">
                <AiOutlineCheckCircle className="text-green-500" />
                <span>User-friendly interface with intuitive navigation</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-blue-500 transition duration-300">
                <AiOutlineCheckCircle className="text-green-500" />
                <span>Regular updates and alerts for new job opportunities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
