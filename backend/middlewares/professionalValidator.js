import Joi from "joi";

// Middleware to normalize fields that should be arrays
export const normalizeArrays = (req, res, next) => {
  if (req.body.availableDays && typeof req.body.availableDays === "string") {
    req.body.availableDays = [req.body.availableDays];
  }
  if (req.body.tags && typeof req.body.tags === "string") {
    req.body.tags = [req.body.tags];
  }
  
  // If tags is an empty string (from FormData append of empty array), make it an empty array
  if (req.body.tags === "") {
    req.body.tags = [];
  }
  if (req.body.availableDays === "") {
    req.body.availableDays = [];
  }

  next();
};

export const validateProfessionalProfile = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    role: Joi.string().optional().allow(""),
    price: Joi.number().min(0).required(),
    desc: Joi.string().min(10).required(),
    experience: Joi.string().required(),
    service: Joi.string().required(),
    time: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    availableDays: Joi.array().items(Joi.string()).optional(),
    image: Joi.string().optional(),
  }).unknown();

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((details) => details.message);
    return res.status(400).json({ success: false, errors: errorMessage });
  }

  next();
};
