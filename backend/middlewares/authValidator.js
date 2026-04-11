import Joi from "joi";

export const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name should be at least 3 characters long",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password should be at least 6 characters long",
    }),
    role: Joi.string().valid("user", "pro").optional(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((details) => details.message);
    return res.status(400).json({ success: false, errors: errorMessage });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((details) => details.message);
    return res.status(400).json({ success: false, errors: errorMessage });
  }

  next();
};
