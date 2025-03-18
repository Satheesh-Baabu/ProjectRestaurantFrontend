import { useState } from "react";
import { login } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      if (credentials.email === "") {
        setError("Username is required");
        return;
      } else if (credentials.password === "") {
        setError("Password is required");
        return;
      }

      const res = await login(credentials);
      console.log(res.data);
      sessionStorage.setItem("token", res.data.accessToken); // Store JWT in sessionStorage
      alert("Login successful!");

      const decoded = jwtDecode(res.data.accessToken);
      console.log("User Role:", decoded.role);

      if (decoded.role === "admin") {
        navigate("/dashboard");
      } else if (decoded.role === "user") {
        navigate("/profile");
      } else if (decoded.role === "supplier") {
        navigate("/supplier");
      } else if (decoded.role === "chef") {
        navigate("/chef");
      } else {
        navigate("/unauthorized");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {/* Email Field */}
      <div className="relative mb-4">
        <Mail className="absolute left-2 top-2 text-gray-500" />
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full pl-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
        />
      </div>

      {/* Password Field */}
      <div className="relative mb-4">
        <Lock className="absolute left-2 top-2 text-gray-500" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full pl-10 pr-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
        />
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <Eye /> : <EyeOff />}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-600 text-sm m-2 text-center">{error}</p>}

      <Button text="Login" onClick={handleSubmit} />

      {/* Register */}
      <div className="text-center mt-3">
        Don't have an Account?
        <Link to="/register">
          <label className="text-[#FFC107] cursor-pointer hover:underline"> Register</label>
        </Link>
      </div>

      {/* Forgot Password Link */}
      <div className="text-center mt-3">
        <Link to="/forgot-password" className="text-[#FFC107] hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
