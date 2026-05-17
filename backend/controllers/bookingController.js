import { protect } from "../middlewares/authMiddleware.js";
import Booking from "../models/bookingModel.js";

// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
      date,
      time,
      professional,
      service,
      notes,
    } = req.body;

    const booking = await Booking.create({
      name,
      phone,
      email,
      address,
      date,
      time,
      professional,
      service,
      notes,
      user: req.user?._id, 
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL BOOKINGS =================
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user?._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE BOOKING =================
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE BOOKING =================
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, status } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Verify ownership
    if (booking.user && booking.user.toString() !== req.user?._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this booking",
      });
    }

    if (date) booking.date = date;
    if (time) booking.time = time;
    if (status) booking.status = status;

    await booking.save();

    res.json({
      success: true,
      message: "Booking updated successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE BOOKING =================
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Verify ownership
    if (booking.user && booking.user.toString() !== req.user?._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this booking",
      });
    }

    await Booking.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};