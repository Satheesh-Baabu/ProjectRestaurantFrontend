import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res=await register(formData);
      console.log(res.data  )
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <InputField label="Name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" />
      <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
      <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
      <Button text="Register" onClick={handleSubmit} />
    </div>
  );
};

export default Register;
