import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button  from "../components/Button";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;


const Menus = () => {
  const [foodData, setFoodData] = useState([]);
  const [openType, setOpenType] = useState(null);
  const typeRefs = useRef({});

  useEffect(() => {
    axios.get(`${API_BASE_URL}/foodlist`)
      .then((response) => {
        setFoodData(response.data);
        console.log(response.data)
        if (response.data.length > 0) {
          setOpenType(response.data[0].foodtype);
        }
      })
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);


  const handleAddToCart = () => {
    alert(`You have to login to add to cart!`);
  };

  const foodTypes = Array.from(new Set(foodData.map(item => item.foodtype)));

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Menu List</h1>
      
      <select
        className="w-full p-2 mb-4 border rounded-lg"
        onChange={(e) => setOpenType(e.target.value)}
        value={openType || ""}
      >
        <option value="">Select Food Type</option>
        {foodTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <div className="w-full  space-y-3">
        {foodTypes.map((type) => (
          <div key={type} ref={(el) => (typeRefs.current[type] = el)}>
            <h2 className="bg-orange-500 text-lg font-semibold p-3 rounded-lg cursor-pointer" onClick={() => setOpenType(type)}>
              {type} - ({foodData.filter(item => item.foodtype === type && item.active===1).length})
            </h2>
            {openType === type && (
              <div className="space-y-2">
                {foodData.filter(item => item.foodtype === type && item.active===1).map((food) => (
                  <div key={food._id} className="bg-gray-300 p-3 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                    <img src={`http://localhost:5000/${food.filename}`} alt={food.foodname} width={50} height={50}className="rounded-xl" />
                      <span className="text-lg font-semibold">
                        {food.foodname} - ₹{food.price}
                      </span>
                      <div className="flex items-center space-x-2 ">
                        
                        <Button className="bg-green-500 text-white" onClick={() => handleAddToCart()} text="Add to Cart"/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menus