import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6"

const Contact = () => {
  return (
    <section className="p-8 m-8 bg-white text-[#2C2C2C]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Contact Details */}
        <div className="md:w-1/2 h-64 bg-white p-6 rounded-lg shadow-lg transition hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-[#8B0000]">Contact Us</h2>
          <p className="mt-2">📧 Email: msvrestaurant123@gmail.com</p>
          <p>📍 Address: 123 Food Street, Sivakasi, Tamil Nadu</p>
          <p>📞 Phone: +91 12345 67890</p>
          
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-blue-600 text-2xl hover:scale-125 transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="text-blue-400 text-2xl hover:scale-125 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 text-2xl hover:scale-125 transition duration-300" />
            </a>
          </div>
        </div>

        {/* Google Map */}
        <div className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-lg transition hover:shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.4140585094563!2d77.80522127405484!3d9.450117491990313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b01290eb4f4d8a1%3A0x8d6b47a50a2d11df!2sSivakasi%2C%20Tamil%20Nadu%20626213!5e0!3m2!1sen!2sin!4v1710000000000"
            width="100%"
            height="250"
            loading="lazy"
            className="rounded-lg"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
