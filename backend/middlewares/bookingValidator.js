import Joi from "joi";


export const validateBooking = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name should be at least 3 characters long",
    }),
    
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be exactly 10 digits",
        "string.empty": "Phone number is required",
      }),
       
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
    }),
    address: Joi.string().required().messages({
      "string.empty": "Address is required",
    }),
    date: Joi.string().required().messages({
      "string.empty": "Date is required",
    }),
    time: Joi.string().required().messages({
      "string.empty": "Time is required",
    }),
    professional: Joi.string().optional(),
    status: Joi.string().valid("confirmed", "pending", "cancelled").optional(),
    
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((details) => details.message);
    return res.status(400).json({ success: false, errors: errorMessage });
  }

  next();
};
