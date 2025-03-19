import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../services/api";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "supplier",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await addUser(formData);
      setMessage(response.data.message);
      alert("User added successfully!");
      navigate("/dashboard/users"); 
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage(error.response?.data?.message || "Failed to add user");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add User</h2>
      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="supplier">Supplier</option>
          <option value="chef">Chef</option>
          <option value="user">User</option>
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md">
          Add 
        </button>
      </form>
    </div>
  );
};

export default AddUser;
