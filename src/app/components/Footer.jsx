import React from "react";
import { FaInstagram, FaGithub, FaTwitter, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#14181c] text-gray-400 text-sm py-6 mt-16">
      <div className="container mx-auto px-4">
        {/* Top Section: Links */}
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex flex-wrap gap-4 mb-4 lg:mb-0">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Pro
            </a>
            <a href="#" className="hover:underline">
              News
            </a>
            <a href="#" className="hover:underline">
              Apps
            </a>
            <a href="#" className="hover:underline">
              Podcast
            </a>
            <a href="#" className="hover:underline">
              Year in Review
            </a>
            <a href="#" className="hover:underline">
              Gifts
            </a>
            <a href="#" className="hover:underline">
              Help
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              API
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-gray-400">
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaGithub className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaTiktok className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-gray-500 text-xs">
          <p>
            © Letterboxd Limited. Made by fans in Aotearoa New Zealand. Film
            data from TMDb. Mobile site.
          </p>
          <p className="mt-2">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="#" className="hover:underline">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="#" className="hover:underline">
              terms of service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
