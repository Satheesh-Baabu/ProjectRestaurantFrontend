import { useState } from "react";
import { forgotPassword } from "../services/api";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await forgotPassword( email);
      alert("OTP sent! Check your email.");
      navigate("/reset-password", { state: { email } }); // Pass email to reset page
    } catch (error) {
      alert("Error: " + error.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
      <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
      <Button text="Send OTP" onClick={handleSubmit} />
    </div>
  );
};

export default ForgotPassword;
