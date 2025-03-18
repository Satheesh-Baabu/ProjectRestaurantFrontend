import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navbar = ({ showOffer }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 md:p-4 z-50 
                    bg-white/10 backdrop-blur-md shadow-lg rounded-b-2xl border-b border-white/20
                    h-[60px] md:h-auto"> {/* Fixed height on small screens */}
      {/* Logo & Brand Name */}
      <div className="flex items-center gap-2">
        <img
          src="/MSV.png"
          alt="Logo"
          className="w-10 h-10 object-cover rounded-full border-2 border-white" // Reduced size on small screens
        />
        <span className="text-lg md:text-xl font-bold text-white drop-shadow-md text-center">MSV Restaurant</span>
      </div>

      {/* Special Offer - Visible only on large screens */}
      {showOffer && (
        <div className="hidden md:block absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#FFC107] text-black px-4 py-2 
                        rounded-md shadow-md text-sm font-semibold">
          🎉 Today Special: Biryani 30% OFF! 🎉
        </div>
      )}

      {/* Login Button */}
      <div className="flex gap-3">
        <Link to={"/login"}>
          <Button className=" text-white px-3 py-1 md:px-4 md:py-2 rounded border border-white/30 
                             hover:bg-white hover:text-black transition duration-300 ease-in-out text-sm md:text-base">
            Login
          </Button>
        </Link>
        <Link to={"/register"}>
          <Button className="text-white px-3 py-1 md:px-4 md:py-2 rounded border border-white/30 
                             hover:bg-white hover:text-black transition duration-300 ease-in-out text-sm md:text-base">
            Register
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
