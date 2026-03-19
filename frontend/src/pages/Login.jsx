import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock Login Logic
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back, Manish!", {
        style: { borderRadius: '12px', background: '#333', color: '#fff' },
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col antialiased">
      
      {/* Top Navigation */}
      <div className="p-8">
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-[#4EC9B0] transition-all font-bold text-sm group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Home
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl shadow-gray-100 p-10 border border-gray-50">
          
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="bg-[#1b9e84] p-3 rounded-2xl shadow-lg mb-4">
              <Home size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-[#1e293b]">Sign In</h1>
            <p className="text-gray-400 font-medium text-sm mt-1">
              Enter your details to access your account
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 border border-gray-100 py-3 rounded-2xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-all">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-4 h-4" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-100 py-3 rounded-2xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-all">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-4 h-4" alt="Github" />
              Github
            </button>
          </div>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative px-4 bg-white text-gray-300 text-[10px] font-bold uppercase tracking-widest">
              Or continue with email
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                required
                type="email" 
                autoComplete="off"
                placeholder="Email Address" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-sm transition-all placeholder:text-gray-300"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                required
                type={showPassword ? "text" : "password"} 
                autoComplete="new-password"
                placeholder="Password" 
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4EC9B0] outline-none font-bold text-sm transition-all placeholder:text-gray-300"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#4EC9B0]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#4EC9B0] hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </div>

            <button 
              disabled={loading}
              className={`w-full bg-[#1b9e84] text-white py-4 rounded-2xl font-black shadow-lg shadow-teal-50 transition-all transform active:scale-95 flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#058f73]"}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-gray-400 font-bold text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#4EC9B0] hover:underline">Get Started</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;