import Joi from "joi";

export const productDto = Joi.object({
  title: Joy.string().required(),
  description: Joy.string().required(),
  code: Joy.string().required(),
  price: Joy.number().required(),
  status: Joy.boolean().required(),
  stock: Joy.number().required(),
  category: Joy.string().required(),
});
