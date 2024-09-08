import { Footer } from "flowbite-react";
import React from 'react'
import { FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";



export default function FooterCom() {
  return (
    <div>
      <Footer container={true} className="bg-gray-800 py-10 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Section */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Company</h6>
            <ul className="space-y-2">
              <li><a href="https://www.100jsprojects.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">References</a></li>
              <li><a href="#" className="hover:text-gray-400">Method</a></li>
              <li><a href="#" className="hover:text-gray-400">Services</a></li>
              <li><a href="#" className="hover:text-gray-400">About Job Listing</a></li>
              <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
              
            </ul>
          </div>

          {/* Updates Section */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Updates</h6>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Careers</a></li>
              <li><a href="#" className="hover:text-gray-400">News</a></li>
              <li><a href="#" className="hover:text-gray-400">Blog</a></li>
              <li><a href="#" className="hover:text-gray-400">Publications</a></li>
              <li><a href="#" className="hover:text-gray-400">Resources</a></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-gray-400"><FaLinkedin size={24} /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-gray-400"><FaTwitter size={24} /></a>
            <a href="#" className="hover:text-gray-400"><FaYoutube size={24} /></a>
          </div>

          {/* Footer Info */}
          <div>
            <p className="text-sm text-gray-400 mb-2">© 2024 Joblisting</p>
            <p className="text-sm text-gray-400 mb-4">All Rights Reserved</p>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
              
            </ul>
          </div>
        </div>
      </div>
    </Footer>
    </div>
  );
}
