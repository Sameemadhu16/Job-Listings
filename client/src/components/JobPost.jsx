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
                Fusce et erat et nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem. Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisi, quis fringilla orci. Donec porttitor, odio a efficitur blandit, orci nisl porta elit, eget vulputate quam nibh ut tellus. Sed ut posuere risus, vitae commodo velit. Nullam in lorem dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Ut eget quam quis vehicula.
                Quisque quis sagittis dolor magna. Vivamus elementum eu leo et gravida. Sed dignissim placerat diam, ac laoreet eros rutrum sit amet. Donec imperdiet in leo et imperdiet. In hac habitasse platea dictumst. Sed quis nisl molestie diam ullamcorper condimentum. Sed aliquet, arcu eget pretium bibendum, odio enim rutrum arcu, quis suscipit mauris turpis in neque. Vestibulum id vestibulum odio. Sed dolor felis, iaculis eget turpis eu, lobortis imperdiet massa.
              </p>
              <h2 className="text-2xl font-bold mb-4">Company Benefits</h2>
              <p className="text-gray-700 mb-4">
                Donec dignissim nunc eu tellus malesuada fermentum. Sed blandit in magna at accumsan. Etiam imperdiet massa aliquam, consectetur leo in, auctor neque.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4">
                <li>In hac habitasse platea dictumst.</li>
                <li>Sed quis nisl molestie diam ullamcorper condimentum.</li>
                <li>Vestibulum id vestibulum odio.</li>
                <li>Etiam libero ante accumsan id tellus rhoncus volutpat velit.</li>
                <li>Nam condimentum sit amet ipsum id malesuada.</li>
              </ul>
              <h2 className="text-2xl font-bold mb-4">Company Vision</h2>
              <p className="text-gray-700 mb-4">
                Praesent ultrices mauris at nisi euismod, ut venenatis augue blandit. Etiam massa risus, accumsan nec tempus nec, venenatis in nisl. Nam volutpat, ex blandit in magna id, pellentesque facilisis sapien. In feugiat auctor mi, eget commodo lectus convallis ac.
              </p>
            </div>
            <div>
              <div className="p-6 bg-gray-50 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold mb-4">Company Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="font-semibold">Founded in:</span>
                    <span className="ml-2">14 June, 2021</span>
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
                    <a href="https://www.estherhoward.com" className="text-blue-600">
                      www.estherhoward.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    <AiOutlinePhone className="mr-2" />
                    <span>+1-202-555-0141</span>
                  </li>
                  <li className="flex items-center">
                    <AiOutlineMail className="mr-2" />
                    <span>esther.howard@gmail.com</span>
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
