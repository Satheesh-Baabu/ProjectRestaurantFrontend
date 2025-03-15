  import { useState } from "react";
  import { login } from "../services/api";
  import { useNavigate, Link } from "react-router-dom";
  import InputField from "../components/InputField";
  import Button from "../components/Button";
  import {jwtDecode} from "jwt-decode";


  const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
      try {
        const res = await login(credentials);
        console.log(res.data)
        sessionStorage.setItem("token", res.data.accessToken); // Store JWT in sessionStorage
        // localStorage.setItem("token", res.data.accessToken);
        alert("Login successful!");
        const decoded = jwtDecode(res.data.accessToken);
        console.log("User Role:", decoded.role);
        if (decoded.role === "admin") {
          navigate("/dashboard");
        } else if(decoded.role === "user"){
          navigate("/profile");
        }
        else if(decoded.role ==="supplier"){
          navigate("/supplier");
        }
        else if(decoded.role ==="chef"){
          navigate("/chef");
        }
        else{
          navigate("/unauthorized")
        }
      } catch (error) {
        alert("Error: " + error.response.data.message);
      }
    };

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <InputField label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="Enter your email" />
        <InputField label="Password" type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Enter password" />
        <Button text="Login" onClick={handleSubmit} />
        {/* Register */}
        <div className="text-center mt-3">
        Don't have an Account?
          <Link to="/register">
            <label className="text-orange-600"> <u>Register</u></label>
          </Link>
        </div>
        
        {/* Forgot Password Link */}
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-orange-600 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    );

  };

  export default Login;
