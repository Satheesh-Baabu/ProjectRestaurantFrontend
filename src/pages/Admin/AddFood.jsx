import axios from 'axios';
import { useState, useRef } from 'react';
import { addFood } from '../../services/api';

function AddFood() {
  const [formData, setFormData] = useState({
    foodname: '',
    vornv: '',
    foodtype: '',
    price: '',
    file: null,
  });

  const fileInputRef = useRef(null); // Reference for file input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('foodname', formData.foodname);
    data.append('vornv', formData.vornv);
    data.append('foodtype', formData.foodtype);
    data.append('price', formData.price);
    data.append('file', formData.file);

    try {
      const response = await addFood(data);
      console.log('Food added successfully:', response.data);
      alert("Food added successfully");

      // Reset the form fields
      setFormData({
        foodname: '',
        vornv: '',
        foodtype: '',
        price: '',
        file: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input manually
      }

    } catch (error) {
      console.error('Error adding food:', error);
      alert("Food not added");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col bg '>
      <label>Food Name:</label>
      <input type="text" name="foodname" value={formData.foodname} onChange={handleChange} required className='border' />

      <label>Veg/Non-Veg</label>
      <select name="vornv" value={formData.vornv} onChange={handleChange} required className='border'>
        <option value="">--Select--</option>
        <option value="Veg">Veg</option>
        <option value="Nonveg">Non-Veg</option>
      </select>

      <label>Food Type:</label>
      <select name="foodtype" value={formData.foodtype} onChange={handleChange} required className='border'>
        <option value="">--Select--</option>
        <option value="Meals">Meals</option>
        <option value="Briyani">Briyani</option>
        <option value="Parotta">Parotta</option>
        <option value="Chicken">Chicken</option>
        <option value="Mutton">Mutton</option>
        <option value="Idly">Idly</option>
        <option value="Dosa">Dosa</option>
        <option value="Fried Rice">Fried Rice</option>
        <option value="Sea Food">Sea Food</option>
      </select>

      <label>Price:</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} required className='border' />

      <label>File:</label>
      <input type="file" name="file" ref={fileInputRef} onChange={handleFileChange} required className='border border-black' />

      <button type="submit" className='border rounded-xl bg-orange-500 p-1 text-white hover:bg-orange-400 cursor-pointer'>Add Food</button>
    </form>
  );
}

export default AddFood;
