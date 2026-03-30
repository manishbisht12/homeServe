import express from "express";
import { createBooking, getBookings, getBookingById, deleteBooking } from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);    
router.get("/my", protect, getBookings);   
router.get("/:id", protect, getBookingById);
router.delete("/:id", protect, deleteBooking);

export default router;