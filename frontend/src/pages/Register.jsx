import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, Mail, Lock, ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  
  // States
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP States (4 Boxes)
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // --- OTP Logic ---
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Agle box par jump karein
    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace dabane par pichle box par jayein
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // --- Form Handlers ---
  const handleSendOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mocking API Call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      toast.success("OTP sent to your email! 📧");
    }, 1500);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    
    if (finalOtp.length < 4) {
      return toast.error("Please enter full 4-digit code");
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Registration Successful! 🎉", {
        style: { borderRadius: '12px', background: '#333', color: '#fff' },
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col antialiased">
      
      {/* Navigation Header */}
      <div className="p-8">
        <button 
          onClick={() => step === 1 ? navigate("/") : setStep(1)}
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
            <h1 className="text-2xl font-black text-[#1e293b]">
              {step === 1 ? "Create Account" : "Verify Email"}
            </h1>
            <p className="text-gray-400 font-medium text-sm mt-1">
              {step === 1 ? "Join our community today" : "Enter the 4-digit code we sent you"}
            </p>
          </div>

          {/* STEP 1: REGISTRATION FORM */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input required type="text" placeholder="Full Name" autoComplete="off" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-sm transition-all" />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input required type="email" placeholder="Email Address" autoComplete="off" className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-sm transition-all" />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create Password" 
                  autoComplete="new-password"
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

              <button 
                disabled={loading}
                className="w-full mt-6 bg-[#1b9e84] text-white py-4 rounded-2xl font-black shadow-lg shadow-teal-50 hover:bg-[#058f73] transition-all flex items-center justify-center gap-2 active:scale-95"
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
                className="w-full bg-[#1b9e84] text-white py-4 rounded-2xl font-black shadow-lg shadow-teal-50 hover:bg-[#058f73] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify & Create Account"}
              </button>

              <div className="text-center">
                <p className="text-xs font-bold text-gray-400">
                  Didn't receive the code?{" "}
                  <button type="button" className="text-[#4EC9B0] hover:underline transition-all">Resend OTP</button>
                </p>
              </div>
            </form>
          )}

          {/* Footer Link */}
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