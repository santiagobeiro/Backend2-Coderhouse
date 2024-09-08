import Joi from "joi";

export const cartDto = Joy.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.string().required(),
    })
  ),
});
