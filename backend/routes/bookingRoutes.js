import express from "express";
import { createBooking, getBookings, getBookingById, deleteBooking } from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";
import {validateBooking} from "../middlewares/bookingValidator.js";

const router = express.Router();

router.post("/", protect, validateBooking, createBooking);    
router.get("/my", protect, getBookings);   
router.get("/:id", protect, getBookingById);
router.delete("/:id", protect, deleteBooking);

export default router;