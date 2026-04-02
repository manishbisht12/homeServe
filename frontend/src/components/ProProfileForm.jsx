import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    price: "",
    service: "plumbing", 
    experience: "",
    desc: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     
      const { data } = await axios.post(
        "http://localhost:5000/api/professionals/update-profile", 
        formData,
        { withCredentials: true }
      );
      
      if (data.success) {
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
            placeholder="e.g. Manish Bisht"
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
            <option value="repair">Painting</option>
            <option value="repair">Carpentry</option>
            <option value="repair">Repair</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Price per Hour (₹)</label>
          <input 
            type="number" 
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
            placeholder="500"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Experience</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
            placeholder="e.g. 5 Years"
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Profile Image URL</label>
        <input 
          type="text" 
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
          placeholder="Paste image link here"
          onChange={(e) => setFormData({...formData, image: e.target.value})}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
        <textarea 
          rows="4"
          className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#4EC9B0] outline-none"
          placeholder="Tell customers about your expertise..."
          onChange={(e) => setFormData({...formData, desc: e.target.value})}
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="w-full bg-[#1b9e84] text-white py-4 rounded-2xl font-bold hover:bg-[#058f73] transition-all"
      >
        {loading ? "Saving..." : "Save Professional Profile"}
      </button>
    </form>
  );
};

export default ProProfileForm;