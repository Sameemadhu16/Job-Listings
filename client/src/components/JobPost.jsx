import React from 'react';
import { Button } from 'flowbite-react';
import { AiOutlineGlobal, AiOutlineMail, AiOutlinePhone, AiFillFacebook, AiFillTwitterCircle, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';

export default function JobPost() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src="https://www.nippon.com/en/ncommon/contents/japan-data/1950395/1950395.jpg"
            alt="Job Post Header"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">logo and title</h1>
            </div>
            <div className="absolute bottom-4 right-4">
              <Button className="bg-blue-600 text-white" pill>
                View Open Position
              </Button>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 mb-4">
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa        dddddddddddddddddddddddddddddddddddddd fffffffffffffffffffffffffffffffffffffffff
                kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk nnnnnnnnnnnnnnnnnnnnnnnnnn jjjjjjjjjjjjjjjjjjjjjjjj mmmmmmmmmmmmmmmmmmmn  nnnnnnnnnnb           ggggggggggggggggggggg
              </p>
              <h2 className="text-2xl font-bold mb-4">Company Benefits</h2>
              <p className="text-gray-700 mb-4">
                You can put your any post
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>Ishan lakshitha.</li>
                <li>pitigala.</li>
                <li>Galle.</li>
                <li>Srilanka.</li>
                <li>Globle Asia.</li>
              </ul>
              <h2 className="text-2xl font-bold mb-4">Company Vision</h2>
              <p className="text-gray-700 mb-4">
                Dont't think about this
              </p>
            </div>
            <div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold mb-4">Company Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="font-semibold">Founded in:</span>
                    <span className="ml-2">14 June, 2024</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold">Organization Type:</span>
                    <span className="ml-2">Private Company</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold">Team Size:</span>
                    <span className="ml-2">120-300 Candidates</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold">Industry Types:</span>
                    <span className="ml-2">Technology</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <AiOutlineGlobal className="mr-2" />
                    <a href="https://www.ishanlakshitha(pvt).com" className="text-blue-600">
                      www.ishanlakshitha.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <AiOutlinePhone className="mr-2" />
                    <span>0775021865</span>
                  </li>
                  <li className="flex items-center">
                    <AiOutlineMail className="mr-2" />
                    <span>ilakshitha7921@gmail.com</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Follow us on</h3>
                <div className="flex space-x-4">
                  <AiFillFacebook className="text-blue-600 text-2xl cursor-pointer" />
                  <AiFillTwitterCircle className="text-blue-400 text-2xl cursor-pointer" />
                  <AiFillInstagram className="text-pink-500 text-2xl cursor-pointer" />
                  <AiFillLinkedin className="text-blue-700 text-2xl cursor-pointer" />
    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
