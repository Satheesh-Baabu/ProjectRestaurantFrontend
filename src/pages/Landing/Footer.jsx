import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      &copy; {new Date().getFullYear()} MSV Restaurant
      <h1>Designed & Developed by Muthu Pandiyan | Satheesh Baabu | Vijayaraj </h1>
    </footer>
  );
};

export default Footer;
