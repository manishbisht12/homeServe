import mongoose from "mongoose";

const proSchema = new mongoose.Schema(
  {
    // Link to the User account
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true 
    },
    name: String,
    role: String, 
    price: Number,
    image: String,
    desc: String,
    experience: String,
    service: String,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    jobs: { type: String, default: "0" },
    time: { type: String, default: "< 2 hours" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Professional", proSchema);