import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const images = [
  { src: "/Prawn_Masala.jpg", text: "Eat well, live well" },
  { src: "/Aloo-Paratha.jpg", text: "A full belly makes a happy heart" },
  { src: "/biriyani.jpg", text: "Good food is good mood" },
  { src: "/mutton.jpg", text: "Hunger is the best sauce" },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [showOffer, setShowOffer] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const offerTimer = setInterval(() => {
      setShowOffer((prev) => !prev);
    }, 30000);
    return () => clearInterval(offerTimer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Navbar showOffer={showOffer} /> {/* Pass offer state to Navbar */}

      {/* Image Carousel */}
      <div className="absolute top-0 left-0 w-full h-full">
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out transform ${
              i === index ? "opacity-100 scale-105" : "opacity-0 scale-95"
            }`}
          >
            <img
              src={img.src}
              alt="Food"
              className="w-full h-full object-cover"
            />

            {/* Centered Text */}
            <div className="absolute  text-white text-2xl md:text-4xl font-bold drop-shadow-2xl animate-pulse px-6 py-3 rounded-lg ">
              {img.text}
            </div>
          </div>
        ))}
      </div>

      {/* Special Offer - Visible only on small screens */}
      {showOffer && (
        <div className="md:hidden absolute top-24 left-1/2 transform -translate-x-1/2 bg-[#FFC107] text-black px-2 py-1 
                        rounded-md shadow-md text-sm font-semibold">
          Today Special: Biryani 30% OFF!🎉
        </div>
      )}
    </div>
  );
};

export default Carousel;
