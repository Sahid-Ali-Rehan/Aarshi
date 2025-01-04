import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // state to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);  // Log form data to console to ensure it's correct
    try {
      const { data } = await axios.post("https://aarshi.onrender.com/api/auth/login", formData);
      toast.success(data.message);

      // Save token to localStorage
      localStorage.setItem("token", data.token);
      // After successful login
      localStorage.setItem('userId', data._id); // where `user.id` is the logged-in user's ID


      // Redirect based on user role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);  // Log the error to the console
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#ffdf99]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFF8E7] p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-[#D4AF37] mb-4">Login</h2>
        <div className="flex items-center mb-4 border-b border-[#D4AF37]">
          <AiOutlineMail className="text-2xl text-[#D4AF37] mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full focus:outline-none text-[#D2C385] bg-[#FFF8E7]"
            required
          />
        </div>
        <div className="flex items-center mb-6 border-b border-[#D4AF37]">
          <AiOutlineLock className="text-2xl text-[#D4AF37] mr-2" />
          <input
            type={showPassword ? "text" : "password"} // toggle password visibility
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full focus:outline-none text-[#D2C385] bg-[#FFF8E7]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // toggle showPassword state
            className="ml-2 text-[#D4AF37]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-[#D4AF37] text-white py-2 rounded-md hover:bg-[#D2C385] transition-all"
        >
          Login
        </button>
        <p className="text-center text-[#D2C385] mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-[#D4AF37] font-semibold"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
