import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, Mail, Lock, ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios"; // Axios import karein

const Register = () => {
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api/auth"; // Aapka backend URL

  // States
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role : "",
  });

  // OTP State (4 Boxes as per your backend fix)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- OTP Logic ---
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // --- 1. Register API (Send OTP) ---
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/register`, formData);
      if (data.success) {
        setStep(2);
        toast.success("4-digit OTP sent to your email! 📧");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Verify OTP API ---
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length < 4) {
      return toast.error("Please enter 4-digit code");
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/verify-otp`, {
        email: formData.email,
        otp: finalOtp,
      });

      if (data.success) {
        toast.success("Account Verified Successfully! 🎉");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or Expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. Resend OTP API ---
  const handleResendOTP = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/resend-otp`, {
        email: formData.email,
      });
      if (data.success) {
        toast.success("New OTP sent to your email!");
        setOtp(["", "", "", ""]); // Clear OTP boxes
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col antialiased">
      {/* Navigation Header */}
      <div className="p-8">
        <button
          onClick={() => (step === 1 ? navigate("/") : setStep(1))}
          className="flex items-center gap-2 text-gray-400 hover:text-[#4EC9B0] transition-all font-bold text-sm group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          {step === 1 ? "Back to Home" : "Back to Edit Details"}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 p-10 border border-gray-50">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-[#1b9e84] p-3 rounded-2xl shadow-lg mb-4">
              {step === 1 ? <Home size={28} className="text-white" /> : <ShieldCheck size={28} className="text-white" />}
            </div>
            <h1 className="text-2xl font-black text-[#1e293b]">{step === 1 ? "Create Account" : "Verify Email"}</h1>
            <p className="text-gray-400 font-medium text-sm mt-1">
              {step === 1 ? "Join our community today" : "Enter the 4-digit code we sent you"}
            </p>
          </div>

          {/* STEP 1: REGISTRATION FORM */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-sm transition-all"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-sm transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#4EC9B0]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

                              <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "user" })}
                    className={`flex-1 py-3 rounded-xl font-bold text-xs border transition-all ${
                      formData.role === "user" ? "bg-[#4EC9B0] text-white border-[#4EC9B0]" : "bg-gray-50 text-gray-400 border-transparent"
                    }`}
                  >
                    I'm a Customer
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "pro" })}
                    className={`flex-1 py-3 rounded-xl font-bold text-xs border transition-all ${
                      formData.role === "pro" ? "bg-[#4EC9B0] text-white border-[#4EC9B0]" : "bg-gray-50 text-gray-400 border-transparent"
                    }`}
                  >
                    I'm a Professional
                  </button>
                </div>

              <button
                disabled={loading}
                className="w-full mt-6 bg-[#1b9e84] text-white py-4 rounded-2xl font-black shadow-lg shadow-teal-50 hover:bg-[#058f73] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Get OTP"}
              </button>
            </form>
          )}

          {/* STEP 2: 4-BOX OTP FORM */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-8">
              <div className="flex justify-center gap-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-14 h-16 text-center text-2xl font-black bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#4EC9B0] focus:bg-white focus:ring-4 focus:ring-[#4EC9B0]/10 outline-none transition-all"
                  />
                ))}
              </div>

              <button
                disabled={loading}
                className="w-full bg-[#1b9e84] text-white py-4 rounded-2xl font-black shadow-lg shadow-teal-50 hover:bg-[#058f73] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify & Create Account"}
              </button>

              <div className="text-center">
                <p className="text-xs font-bold text-gray-400">
                  Didn't receive the code?{" "}
                  <button onClick={handleResendOTP} type="button" className="text-[#4EC9B0] hover:underline transition-all">
                    Resend OTP
                  </button>
                </p>
              </div>
            </form>
          )}

          <p className="mt-10 text-center text-gray-400 font-bold text-sm">
            Already a member?{" "}
            <Link to="/login" className="text-[#4EC9B0] hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;