import { useEffect,useState,useRef } from "react";
import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { getUser,isAuthenticated } from "../../utils/ProtectedRoute";

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
  return (
    <div>
        <header className="bg-white shadow-md py-4 px-2 flex items-center justify-between">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl cursor-pointer">
          <FaBars />
        </button>
        
        <h2 className="text-xl font-bold cursor-pointer">MSV Restaurant</h2>

        {/* Profile Section */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center space-x-2"
            onClick={() => setProfileDropdown(!profileDropdown)}
          >
            <FaUserCircle className="text-3xl text-gray-600" />
            <span className="text-lg font-medium">{user?.name || "Guest"}</span>
          </button>

          {/* Profile Dropdown */}
          {profileDropdown && (
            <div className="absolute right-0 mt-2 w-60 bg-white shadow-md rounded-lg">
              <label className="block w-full px-4 py-2 text-left">{user?.email || "Email"}</label>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Menu */}
      <aside
        ref={menuRef}
        className={`absolute top-0 left-0 w-50 bg-white h-full shadow-md transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-64"}  duration-700 ease-out`}
      >
        <nav className="flex flex-col space-y-4 ">
          <Link to="/profile" className="p-3 text-lg font-medium hover:text-orange-600 hover:bg-gray-200">
            Home 
          </Link>
          <Link to="menulist" className="p-3 text-lg font-medium hover:text-orange-600 hover:bg-gray-200">
            Menu List
          </Link>
          <Link to="orders" className="p-3 text-lg font-medium hover:text-orange-600 hover:bg-gray-200">
            My Orders
          </Link>
          <button
                onClick={handleLogout}
                className="p-3 text-left text-lg font-medium text-orange-600 hover:bg-gray-200"
              >
                Logout
              </button>
        </nav>
      </aside>
    </div>
  )
}

export default Header