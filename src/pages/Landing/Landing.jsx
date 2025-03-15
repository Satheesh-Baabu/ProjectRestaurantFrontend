import React from "react";
import { FaRupeeSign } from "react-icons/fa"; // Import Rupee Symbol
import Carousel from "./Carousel";
import FoodSection from "./FoodSection";
import Contact from "./Contact";
import Footer from "./Footer";
import Testimonials from "./Testimonials";


const foodItems = {
  "Non-Veg": [
    { name: "Grilled Chicken", price: 100, img: "/chicken.jpg" },
    { name: "Mutton Curry", price: 120, img: "/mutton.jpg" },
    { name: "Fried Fish", price: 45, img: "/fish.jpg" },
    { name: "Chicken Biryani", price: 90, img: "/biriyani.jpg" },
    { name: "Tandoori Chicken", price: 120, img: "/Tandoori-Chicken.jpg" },
    { name: "Butter Chicken", price: 85, img: "/butter-chicken.jpg" },
    { name: "Prawn Masala", price: 160, img: "/Prawn_Masala.jpg" },
    { name: "Mutton Kebab", price: 120, img: "/mutton_kebab.jpg" }
  ],
  "Veg": [
    { name: "Masala Dosa", price: 25, img: "/Masala Dosa.jpg" },
    { name: "Chapathi", price: 20, img: "/chapathi.jpg" },
    { name: "Veg Pulao", price: 45, img: "/veg-pulao.jpg" },
    { name: "Veg Biryani", price: 80, img: "/veg biryani.jpg" },
    { name: "Paneer Butter Masala", price: 60, img: "/paneer.jpg" },
    { name: "Aloo Paratha", price: 15, img: "/Aloo-Paratha.jpg" },
    { name: "Mushroom Curry", price: 30, img: "/Mushroom-Curry.jpg" },
    { name: "Palak Paneer", price: 45, img: "/palak-paneer.jpg" }
  ]
};

function Landing() {
  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#2C2C2C] overflow-hidden">
      {/* <Navbar /> */}
      <Carousel />
      {Object.entries(foodItems).map(([title, items]) => (
        <FoodSection
          key={title}
          title={title}
          items={items.map(item => ({
            ...item,
            price: (
              <>
                <FaRupeeSign className="inline-block text-[#ce4646]" /> {item.price}
              </>
            )
          }))}
        />
      ))}
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default Landing;
