// import { useEffect,useState,useRef } from "react";
// import React from 'react'
// import { Link,useNavigate } from "react-router-dom";
// import { FaBars, FaUserCircle } from "react-icons/fa";
// import { getUser,isAuthenticated } from "../../utils/ProtectedRoute";

// function Header() {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [profileDropdown, setProfileDropdown] = useState(false);
//     const [user, setUser] = useState(null);
//     const menuRef = useRef(null);
//     const profileRef = useRef(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!isAuthenticated()) {
//           alert("Session expired! Please log in again.");
//           navigate("/");
//         } else {
//           setUser(getUser());
//         }
//       }, [navigate]);           
//     useEffect(() => {
//         function handleClickOutside(event) {
//           if (menuRef.current && !menuRef.current.contains(event.target)) {
//             setMenuOpen(false);
//           }
//           if (profileRef.current && !profileRef.current.contains(event.target)) {
//             setProfileDropdown(false);
//           }
//         }
    
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//           document.removeEventListener("mousedown", handleClickOutside);
//         };
//       }, []);
//       const handleLogout = () => {
//         sessionStorage.removeItem("token");
//         navigate("/");
//       };
//   return (
//     <div>
//         <header className="bg-white shadow-md py-4 px-2 flex items-center justify-between">
//         <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer">
//           <FaBars />
//         </button>
        
//         <h2 className="text-xl font-bold cursor-pointer">MSV Restaurant</h2>

//         {/* Profile Section */}
//         <div className="relative" ref={profileRef}>
//           <button
//             className="flex items-center space-x-2"
//             onClick={() => setProfileDropdown(!profileDropdown)}
//           >
//             <FaUserCircle className="text-3xl text-gray-600" />
//             <span className="text-lg font-medium">{user?.name || "Guest"}</span>
//           </button>

//           {/* Profile Dropdown */}
//           {profileDropdown && (
//             <div className="absolute right-0 mt-2 w-60 bg-white shadow-md rounded-lg">
//               <label className="block w-full px-4 py-2 text-left">{user?.email || "Email"}</label>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-200"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Sidebar Menu */}
//       <aside
//         ref={menuRef}
//         className={`absolute top-0 left-0 w-50 bg-white h-full shadow-md transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-64"}  duration-700 ease-out`}
//       >
//         <nav className="flex flex-col space-y-4 ">
//           <Link to="/profile" className="p-3 text-lg font-medium hover:text-orange-600 hover:bg-gray-200">
//             Home 
//           </Link>
//           <Link to="menulist" className="p-3 text-lg font-medium hover:text-orange-600 hover:bg-gray-200">
//             Menu List
//           </Link>
//           <Link to="cart" className="p-3 text-lg font-medium hover:text-orange-600 hover:bg-gray-200">
//             Cart
//           </Link>
//           <Link to="orders" className="p-3 text-lg font-medium hover:text-orange-600 hover:bg-gray-200">
//             My Orders
//           </Link>
//           <button
//                 onClick={handleLogout}
//                 className="p-3 text-left text-lg font-medium text-orange-600 hover:bg-gray-200"
//               >
//                 Logout
//               </button>
//         </nav>
//       </aside>
//     </div>
//   )
// }

// export default Header

import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle, FaHome, FaUtensils, FaShoppingCart, FaReceipt, FaSignOutAlt } from "react-icons/fa";
import { getUser, isAuthenticated } from "../../utils/ProtectedRoute";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      alert("Session expired! Please log in again.");
      navigate("/");
    } else {
      setUser(getUser());
    }
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const closeSidebar = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <header className="bg-[#ffc107] shadow-md py-4 px-4 flex items-center justify-between fixed w-full z-10">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer text-white">
          <FaBars />
        </button>

        <h2 className="text-xl font-bold cursor-pointer text-white flex"><img src="/MSV.png" width={30} className="mx-2"/>MSV Restaurant</h2>

        {/* Profile Section */}
        <div className="relative " ref={profileRef}>
          <button className="flex items-center space-x-2 cursor-pointer text-white" onClick={() => setProfileDropdown(!profileDropdown)}>
            <FaUserCircle className="text-3xl" />
            <span className="text-lg font-medium ">{user?.name || "Guest"}</span>
          </button>

          {/* Profile Dropdown */}
          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-70 bg-white shadow-md rounded-lg p-2">
              <label className="block w-full px-4 py-2 text-gray-800 font-medium">{user?.email || "Email"}</label>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left cursor-pointer text-white bg-red-500 hover:bg-red-600 rounded-lg flex items-center space-x-2"
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Menu */}
      <aside
        ref={menuRef}
        className={`absolute top-0 left-0 w-60 bg-white h-full shadow-md transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-64"} duration-700 ease-out z-20 fixed`}
      >
        <nav className="flex flex-col space-y-2 py-6 px-4">
          <Link to="/profile" onClick={closeSidebar} className="flex items-center space-x-3 p-3 text-lg font-medium text-gray-800 hover:text-[#ffc107e3] hover:bg-gray-200 rounded-md">
            <FaHome /> <span>Home</span>
          </Link>
          <Link to="menulist" onClick={closeSidebar} className="flex items-center space-x-3 p-3 text-lg font-medium text-gray-800 hover:text-[#ffc107e3] hover:bg-gray-200 rounded-md">
            <FaUtensils /> <span>Menu List</span>
          </Link>
          <Link to="cart" onClick={closeSidebar} className="flex items-center space-x-3 p-3 text-lg font-medium text-gray-800 hover:text-[#ffc107e3] hover:bg-gray-200 rounded-md">
            <FaShoppingCart /> <span>Cart</span>
          </Link>
          <Link to="orders" onClick={closeSidebar} className="flex items-center space-x-3 p-3 text-lg font-medium text-gray-800 hover:text-[#ffc107e3] hover:bg-gray-200 rounded-md">
            <FaReceipt /> <span>My Orders</span>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              closeSidebar();
            }}
            className="flex items-center space-x-3 p-3 text-lg font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
          >
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </nav>
      </aside>
    </div>
  );
}

export default Header;
