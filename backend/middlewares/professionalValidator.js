import Joi from "joi";

export const validateProfessionalProfile = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    role: Joi.string().required(),
    price: Joi.number().min(0).required(),
    desc: Joi.string().min(10).required(),
    experience: Joi.string().required(),
    service: Joi.string().required(),
    time: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    availableDays: Joi.array().items(Joi.string()).optional(),
    image: Joi.string().optional(), // In case it's passed as a URL string instead of a file
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((details) => details.message);
    return res.status(400).json({ success: false, errors: errorMessage });
  }

  next();
};
