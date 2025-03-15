import React, { useState, useEffect } from "react";

const testimonials = [
  { name: "Soodu", review: "The best biryani I've ever had!", rating: "⭐⭐⭐⭐⭐" },
  { name: "Vijayaraj", review: "Delicious food and great service!", rating: "⭐⭐⭐⭐" },
  { name: "Mani", review: "Amazing food experience!", rating: "⭐⭐⭐" },
  { name: "Satheesh", review: "Fantastic flavors and great atmosphere!", rating: "⭐⭐⭐⭐" },
  { name: "MuthuPandi", review: "A must-visit for food lovers!", rating: "⭐⭐⭐⭐⭐" },
  { name: "Vignesh", review: "Absolutely delicious food, amazing ambiance, and top-notch service—highly recommended!", rating: "⭐⭐⭐⭐⭐⭐⭐" }

];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    testimonials[(index - 1 + testimonials.length) % testimonials.length],
    testimonials[index],
    testimonials[(index + 1) % testimonials.length]
  ];

  return (
    <section className="py-10 h-80 bg-[#FAF3E0] dark:bg-gray-900 text-center"> {/* Removed fixed height */}
      <h2 className="text-3xl font-bold text-[#8B0000] dark:text-yellow-400">What Our Customers Say</h2>
      <div className="mt-8 flex justify-center items-center gap-6"> {/* Removed overflow-hidden */}
        {visibleTestimonials.map((t, i) => (
          <div
            key={i}
            className={`relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-64 md:w-80 transition-transform duration-700 ease-in-out transform
              ${i === 1 ? "scale-110 font-bold shadow-2xl border-4 border-yellow-500 border-solid z-10" : "opacity-70 scale-95"} 
              ${i === 0 ? "-rotate-6" : i === 2 ? "rotate-6" : ""}
            `}
          >
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{t.name}</p>
            <p className="text-gray-700 dark:text-gray-300 italic">{t.review}</p>
            <p className="text-yellow-500 text-xl mt-2">{t.rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;