import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CartModal from "./CartModal";
import Button from "../../components/Button";
import { getUser, isAuthenticated } from "../../utils/ProtectedRoute";
import { useNavigate } from "react-router-dom";

const FoodList = () => {
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
      .get("http://localhost:5000/foodlist")
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
        .get(`http://localhost:5000/cart/${user.id}`)
        .then((response) => {
          setCart(response.data.items || []);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    }
  }, [isCartOpen, change]);

  // ✅ Update quantity in menu
  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = async (food) => {
    if (!user) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/cart/add", {
        userId: user.id,
        foodId: food._id,
        quantity: quantities[food._id],
      });
      setCart(response.data.items);
      alert("Added successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Remove item from cart
  const handleRemoveFromCart = async (foodId) => {
    try {
      const response = await axios.post("http://localhost:5000/cart/remove", {
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
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Menu List</h1>

      {/* ✅ Food Type Filter */}
      <select
        className="w-full p-2 mb-4 border rounded-lg"
        onChange={(e) => setOpenType(e.target.value)}
        defaultValue=""
      >
        <option value="">Select Food Type</option>
        {foodTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      {/* ✅ Food List Grouped by Type */}
      <div className={`w-full space-y-3 ${isCartOpen ? "opacity-30" : ""}`}>
        {foodTypes.map((type) => (
          <div key={type} ref={(el) => (typeRefs.current[type] = el)}>
            <h2
              className="bg-orange-500 text-lg font-semibold p-3 rounded-lg cursor-pointer"
              onClick={() => setOpenType(type)}
            >
              {type} - ({foodData.filter(item => item.foodtype === type && item.active === 1).length})
            </h2>

            {openType === type && (
              <div className="space-y-2">
                {foodData
                  .filter(item => item.foodtype === type && item.active === 1)
                  .map((food) => (
                    <div key={food._id} className="bg-gray-300 p-3 rounded-lg shadow">

                      <div className="flex items-center justify-between">
                        <img
                          src={`http://localhost:5000/${food.filename}`}
                          alt={food.foodname}
                          width={50}
                          height={50}
                          className="rounded-xl"
                        />
                        <div>
                          <h2 className="font-semibold">{food.foodname}</h2>
                          <p className="text-sm text-gray-500">₹{food.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button text="-" onClick={() => handleQuantityChange(food._id, -1)} />
                          <span>{quantities[food._id]}</span>
                          <Button text="+" onClick={() => handleQuantityChange(food._id, 1)} />
                          <Button text="🛒" className="bg-green-500 text-white" onClick={() => handleAddToCart(food)} />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Fixed Cart Button */}
      <div className="fixed bottom-4 right-4">
        <Button text="🛒 Cart" onClick={() => setIsCartOpen(true)} />
      </div>

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
