import axios from 'axios';
import { useState } from 'react';

function AddFood() {
  const [formData, setFormData] = useState({
    foodname: '',
    vornv:'',
    foodtype: '',
    price: '',
    file: null,
  });

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
      const response = await axios.post('http://localhost:5000/addfood', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Food added successfully:', response.data);
      alert("Food added successfully")
    } catch (error) {
      console.error('Error adding food:', error);
      alert("food Not added")
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col bg '>
      <label>Food Name:</label>
      <input type="text" name="foodname" onChange={handleChange} required  className='border'/>

      <label>Veg/Non-Veg</label>
      <select name="vornv" onChange={handleChange} required className='border'>
        <option value="">--Select--</option>
        <option value="Veg">Veg</option>
        <option value="Nonveg">Non-Veg</option>
      </select>

      <label>Food Type:</label>
      <select name="foodtype" onChange={handleChange} required className='border'>
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
      <input type="number" name="price" onChange={handleChange} required className='border'/>

      <label>File:</label>
      <input type="file" name="file" onChange={handleFileChange} required className='border border-black' />

      <button type="submit" className='border rounded-xl bg-orange-500 p-1 text-white  hover:bg-orange-400 cursor-pointer'>Add Food</button>
    </form>
  );
}

export default AddFood;
