import React from 'react'
import { Button, Card, Avatar, Badge } from 'flowbite-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { GiWorld } from "react-icons/gi";
import { FaAddressCard } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export default function PosterDashEmployeeProfile() {
  return (
    <div className='w-full bg-red-800'>
      
      <div className="bg-gray-100 p-8 min-h-screen">
      <div className="w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar img="https://via.placeholder.com/100" rounded={true} size="xl" />
            <div className="ml-4">
              <h1 className="text-xl font-bold">Ishan Lakshitha</h1>
              <p className="text-gray-600">Website Designer (UI/UX)</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button color='red'>Send Mail</Button>
            <Button gradientDuoTone="greenToBlue">Hire Candidates</Button>
          </div>
        </div>


        {/* Biography and Cover Letter */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Biography */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-lg font-semibold mb-2">Biography</h2>
              <p className="text-gray-700">
                I've been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces...
              </p>
            </Card>
            {/* Cover Letter */}
            <Card className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Cover Letter</h2>
              <p className="text-gray-700">
                Dear Sir, <br />
                I am writing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System...
              </p>
            </Card>
          </div>
          {/* Sidebar */}
          <div>


            {/* Personal Info */}

            <Card>
              <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
              <ul className="text-gray-700">
                <li className="flex justify-between"><span>Date of Birth:</span> <span>14 June, 2021</span></li>
                <li className="flex justify-between"><span>Nationality:</span> <span>Bangladesh</span></li>
                <li className="flex justify-between"><span>Marital Status:</span> <span>Single</span></li>
                <li className="flex justify-between"><span>Gender:</span> <span>Male</span></li>
              </ul>
            </Card>

            
            {/* Resume */}

            <Card className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Download My Resume</h2>
              <Button gradientDuoTone="blueToIndigo">Esther Howard PDF</Button>
            </Card>


            {/* Contact Information */}
            <Card className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
              <ul className="text-gray-700">
                <li className="flex items-center"><span className="mr-2"><GiWorld /></span> www.estherhoward.com</li>
                <li className="flex items-center"><span className="mr-2"><FaAddressCard /></span> Beverly Hills, California 90202</li>
                <li className="flex items-center"><span className="mr-2"><IoCall /></span> +1-202-555-0141</li>
                <li className="flex items-center"><span className="mr-2"><MdEmail /></span> esther.howard@gmail.com</li>
              </ul>
            </Card>
          </div>
        </div>


        {/* Social Media */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Follow me on Social Media</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500"><FaFacebook size="2em" /></a>
            <a href="#" className="text-blue-400"><FaTwitter size="2em" /></a>
            <a href="#" className="text-pink-600"><FaInstagram size="2em" /></a>
            <a href="#" className="text-blue-700"><FaLinkedin size="2em" /></a>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
