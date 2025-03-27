// import { Link } from "react-router-dom";
// import { useState,useEffect } from 'react';
// import { getUser, isAuthenticated } from "../../utils/ProtectedRoute";
// import { useNavigate } from "react-router-dom";

// function Home() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         if (!isAuthenticated()) {
//           alert("Session expired! Please log in again.");
//           navigate("/");
//         } else {
//           setUser(getUser());
//         }
//       }, [navigate]);
//     return (
//         <div>
//             <main className="flex-grow flex items-center justify-center p-6">
//                 <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
//                     <h2 className="text-2xl font-bold text-center mb-4">
//                         Hi, {user?.name || "Guest"}
//                     </h2>
//                     {user ? (
//                         <div className="grid grid-cols-2 gap-4">
//                             <Link
//                                 to="/profile"
//                                 className="p-4 text-center text-orange-500 bg-orange-200 hover:bg-orange-100 rounded-lg"
//                             >
//                                 Home
//                             </Link>
//                             <Link
//                                 to="menulist"
//                                 className="p-4 text-center text-orange-500 bg-orange-200 hover:bg-orange-100 rounded-lg"
//                             >
//                                 Menu List
//                             </Link>
//                             <Link
//                                 to="cart"
//                                 className="p-4 text-center text-orange-500 bg-orange-200 hover:bg-orange-100 rounded-lg"
//                             >
//                                 Cart
//                             </Link>
//                             <Link
//                                 to="orders"
//                                 className="p-4 text-center text-orange-500 bg-orange-200 hover:bg-orange-100 rounded-lg"
//                             >
//                                 My Orders
//                             </Link>
//                         </div>
//                     ) : (
//                         <p className="text-center text-red-500">Error loading profile...</p>
//                     )}
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default Home
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser, isAuthenticated } from "../../utils/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUtensils, FaShoppingCart, FaReceipt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      alert("Session expired! Please log in again.");
      navigate("/");
    } else {
      setUser(getUser());
    }
  }, [navigate]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Slideshow */}
      <div className="w-full max-w-lg mb-6">
        <Slider {...settings}>
          <img src="/biriyani.jpg" alt="Slide 1" className="w-full h-64 object-cover rounded-lg" />
          <img src="/butter-chicken.jpg" alt="Slide 2" className="w-full h-64 object-cover rounded-lg" />
          <img src="/chicken.jpg" alt="Slide 3" className="w-full h-64 object-cover rounded-lg" />
          <img src="/chapathi.jpg" alt="Slide 4" className="w-full h-64 object-cover rounded-lg" />
        </Slider>
      </div>
      
      <main className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Hi, {user?.name || "Guest"}</h2>
        {user ? (
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/profile"
              className="flex items-center justify-center p-4 text-lg font-medium text-white bg-[#ffc107e3] hover:bg-[#e0a800] rounded-lg shadow-md"
            >
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="menulist"
              className="flex items-center justify-center p-4 text-lg font-medium text-white bg-[#ffc107e3] hover:bg-[#e0a800] rounded-lg shadow-md"
            >
              <FaUtensils className="mr-2" /> Menu
            </Link>
            <Link
              to="cart"
              className="flex items-center justify-center p-4 text-lg font-medium text-white bg-[#ffc107e3] hover:bg-[#e0a800] rounded-lg shadow-md"
            >
              <FaShoppingCart className="mr-2" /> Cart
            </Link>
            <Link
              to="orders"
              className="flex items-center justify-center p-4 text-lg font-medium text-white bg-[#ffc107e3] hover:bg-[#e0a800] rounded-lg shadow-md"
            >
              <FaReceipt className="mr-2" /> Orders
            </Link>
          </div>
        ) : (
          <p className="text-center text-red-600 font-medium">⚠️ Error loading profile...</p>
        )}
      </main>
    </div>
  );
}

export default Home;

