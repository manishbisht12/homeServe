import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

const ProProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); 
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    service: "plumbing", 
    experience: "",
    desc: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("service", formData.service);
    data.append("experience", formData.experience);
    data.append("desc", formData.desc);
    if (imageFile) {
      data.append("image", imageFile); 
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/professionals/update-profile", 
        data,
        { 
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" } 
        }
      );
      
      if (response.data.success) {
        toast.success("Profile Updated Successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Business Profile</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
            placeholder="Manish Bisht"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Service Category</label>
          <select 
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
            onChange={(e) => setFormData({...formData, service: e.target.value})}
          >
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
            <option value="painting">Painting</option> 
            <option value="carpentry">Carpentry</option> {/* Fixed value */}
            <option value="repair">Repair</option>
          </select>
        </div>
      </div>

      {/* File Upload Section */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Profile Image (Local)</label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-xs text-gray-500">
                {imageFile ? <span className="text-[#4EC9B0] font-bold">{imageFile.name}</span> : "Click to upload photo"}
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])} 
            />
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <input 
          type="number" 
          placeholder="Price per Hour (₹)"
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
          onChange={(e) => setFormData({...formData, price: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Experience (e.g. 5 Years)"
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
          onChange={(e) => setFormData({...formData, experience: e.target.value})}
        />
      </div>

      <textarea 
        rows="4"
        className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
        placeholder="Tell customers about your expertise..."
        onChange={(e) => setFormData({...formData, desc: e.target.value})}
      ></textarea>

      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-[#1b9e84] text-white py-4 rounded-2xl font-bold hover:bg-[#058f73] transition-all"
      >
        {loading ? "Uploading Data..." : "Save Professional Profile"}
      </button>
    </form>
  );
};

export default ProProfileForm;