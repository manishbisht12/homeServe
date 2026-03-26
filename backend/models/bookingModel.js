import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
    date: String,
    time: String,
    professional: String,

    // optional (future use)
    status: {
      type: String,
      default: "confirmed"
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);