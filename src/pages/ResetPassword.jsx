import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // Get email from state

  const [formData, setFormData] = useState({ email, otp: "", newPassword: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await resetPassword(formData);
      alert("Password reset successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
      <InputField label="OTP" type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="Enter OTP" />
      <InputField label="New Password" type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Enter new password" />
      <Button text="Reset Password" onClick={handleSubmit} />
    </div>
  );
};

export default ResetPassword;
