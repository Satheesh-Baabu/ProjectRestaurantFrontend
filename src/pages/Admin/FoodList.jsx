import axios from 'axios';
import { FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useState,useEffect } from 'react';

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

function FoodList() {
  const [foodlist, setFoodlist] = useState([]);
  
  useEffect(() => {
    axios.get(`${API_BASE_URL}/foodlist`)
      .then(response => {
        console.log(response.data);
        setFoodlist(response.data);
      })
      .catch(err => console.error('Error fetching food list:', err));
  }, []);

  async function handleToggle(food) {
    const updatedActive = food.active === 1 ? 0 : 1;

    try {
      await axios.put(`${API_BASE_URL}/foodlist/${food._id}`, {
        active: updatedActive,
      });

      setFoodlist((prevList) =>
        prevList.map((item) =>
          item._id === food._id ? { ...item, active: updatedActive } : item
        )
      );
    } catch (err) {
      console.error("Error updating Food state:", err);
      alert("Failed to update Food state.");
    }
  }

  async function handleDelete(foodId) {
    if (!window.confirm("Are you sure you want to delete this food item?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/foodlist/${foodId}`);
      setFoodlist((prevList) => prevList.filter((item) => item._id !== foodId));
      alert("Food Successfully deleted")
    } catch (err) {
      console.error("Error deleting food item:", err);
      alert("Failed to delete food item.");
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Food Name</th>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {foodlist.map((food, index) => (
            <tr key={food._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{food.foodname}</td>
              <td className="border border-gray-300 px-4 py-2">{food.foodtype}</td>
              <td className="border border-gray-300 px-4 py-2">Rs.{food.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={`${API_BASE_URL}/${food.filename}`}
                  alt={food.foodname}
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleToggle(food)} className="text-2xl">
                  {food.active === 1 ? (
                    <FaToggleOn className="text-green-500 text-2xl" />
                  ) : (
                    <FaToggleOff className="text-gray-400" />
                  )}
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleDelete(food._id)} className="text-red-500 text-xl">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
