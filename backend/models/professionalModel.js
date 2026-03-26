import mongoose from "mongoose";

const proSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    rating: Number,
    reviews: Number,
    price: Number,
    image: String,
    desc: String,
    experience: String,
    jobs: String,
    time: String,
    service: String, 
  },
  { timestamps: true }
);

export default mongoose.model("Professional", proSchema);