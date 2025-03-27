import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CartModal from "./CartModal";
import Button from "../../components/Button";
import { getUser, isAuthenticated } from "../../utils/ProtectedRoute";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { motion, AnimatePresence } from "framer-motion";


const FoodList = () => {
  // ... (keep all your existing state declarations)
  const [foodData, setFoodData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [user, setUser] = useState(null);
  const [foodTypes, setFoodTypes] = useState([]);
  const [openType, setOpenType] = useState("");
  const navigate = useNavigate();
  const typeRefs = useRef({});
  const [addingToCart, setAddingToCart] = useState(null);


  // ✅ Fetch User Data
  useEffect(() => {
    if (!isAuthenticated()) {
      alert("Session expired! Please log in again.");
      navigate("/");
    } else {
      setUser(getUser());
    }
  }, [navigate]);

  // ✅ Fetch Food Data
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/foodlist`)
      .then((response) => {
        setFoodData(response.data);
        setQuantities(
          response.data.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {})
        );
        const uniqueTypes = [...new Set(response.data.map((item) => item.foodtype))];
        setFoodTypes(uniqueTypes);
        if (uniqueTypes.length > 0) {
          setOpenType(uniqueTypes[0]);
        }
      })
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);

  // ✅ Fetch Cart Data (Only if user is set)
  useEffect(() => {
    if (user) {
      axios
        .get(`${API_BASE_URL}/cart/${user.id}`)
        .then((response) => {
          setCart(response.data.items || []);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    }
  }, [isCartOpen, change,user]);

  // ✅ Update quantity in menu
  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  useEffect(() => {
    if (openType && typeRefs.current[openType]) {
      typeRefs.current[openType].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [openType]);

  // ... (keep all your existing useEffect hooks and handler functions)

  const handleAddToCart = async (food) => {
    if (!user) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
    setAddingToCart(food._id);
    try {
      const response = await axios.post(`${API_BASE_URL}/cart/add`, {
        userId: user.id,
        foodId: food._id,
        quantity: quantities[food._id],
      });
      setCart(response.data.items);
      setTimeout(() => {
        setAddingToCart(null);
      }, 1000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddingToCart(null);
    }
  };

  // ✅ Remove item from cart
  const handleRemoveFromCart = async (foodId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart/remove`, {
        userId: user.id,
        foodId,
      });
      setCart(response.data.items);
      setChange((prev) => !prev);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8e1] to-gray-100 p-4 pb-20 ">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#ffc107e3]">Our Delicious Menu</h1>
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                text={`🛒 Cart (${cart.length})`} 
                onClick={() => setIsCartOpen(true)}
                className="bg-[#ffc107e3] hover:bg-[#ffca28] text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all"
              />
            </motion.div>
            {cart.length > 0 && (
              <motion.span 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {cart.length}
              </motion.span>
            )}
          </div>
        </div>

        {/* Food Type Filter */}
        <div className="mb-8">
          <select
            className="w-full p-3 mb-4 border-2 border-[#ffc107e3] rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#ffc107e3]"
            onChange={(e) => setOpenType(e.target.value)}
            value={openType}
          >
            <option value="">All Categories</option>
            {foodTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Food List Grouped by Type */}
        <div className={`space-y-6 ${isCartOpen ? "opacity-30" : ""}`}>
          {foodTypes.map((type) => (
            <div 
              key={type} 
              ref={(el) => (typeRefs.current[type] = el)} 
              className="mb-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-[#ffc107e3] to-[#ffd54f] text-white text-xl font-bold p-4 rounded-xl shadow-lg cursor-pointer flex justify-between items-center"
                onClick={() => setOpenType(type === openType ? "" : type)}
              >
                <span>{type}</span>
                <span className="bg-white text-[#ffc107e3] rounded-full px-3 py-1 text-sm">
                  {foodData.filter(item => item.foodtype === type && item.active === 1).length} items
                </span>
              </motion.h2>

              <AnimatePresence>
                {openType === type && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {foodData
                        .filter(item => item.foodtype === type && item.active === 1)
                        .map((food) => (
                          <motion.div 
                            key={food._id} 
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                            whileHover={{ y: -5 }}
                            layout
                          >
                            <div className="flex h-full">
                              <div className="w-1/3 flex-shrink-0">
                                <img
                                  src={`${API_BASE_URL}/${food.filename}`}
                                  alt={food.foodname}
                                  className="w-full h-32 object-cover"
                                />
                              </div>
                              <div className="w-2/3 p-4 flex flex-col">
                                <div className="flex-grow">
                                  <h3 className="font-bold text-lg text-gray-800">{food.foodname}</h3>
                                  <p className="text-[#ffc107e3] font-semibold">₹{food.price}</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <Button 
                                      text="-" 
                                      onClick={() => handleQuantityChange(food._id, -1)}
                                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-full"
                                    />
                                    <span className="font-medium w-6 text-center">{quantities[food._id]}</span>
                                    <Button 
                                      text="+" 
                                      onClick={() => handleQuantityChange(food._id, 1)}
                                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-full"
                                    />
                                  </div>
                                  <motion.div
                                    animate={addingToCart === food._id ? {
                                      scale: [1, 1.1, 1],
                                      transition: { duration: 0.5 }
                                    } : {}}
                                  >
                                    <Button 
                                      text={addingToCart === food._id ? "✓ Added" : "Add to Cart"}
                                      onClick={() => handleAddToCart(food)}
                                      className={`bg-[#ffc107e3] hover:bg-[#ffca28] text-white font-medium py-1 px-4 rounded-full text-sm min-w-[100px] ${
                                        addingToCart === food._id ? "bg-green-500 hover:bg-green-600" : ""
                                      }`}
                                    />
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal
          cart={cart}
          setCart={setCart}
          onClose={() => setIsCartOpen(false)}
          handleRemoveFromCart={handleRemoveFromCart}
          user={user}
        />
      )}
    </div>
  );
};

export default FoodList;