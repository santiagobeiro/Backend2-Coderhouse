import * as service from '../services/cart.services.js'
import { getProductById, updateProduct } from '../services/product.services.js';
import { getUserByEmail } from '../services/user.services.js';
import { createTicket } from '../services/ticket.services.js';
import { resTicketDto } from '../dtos/ticket.dto.js';
import { v4 as uuidv4 } from 'uuid';

export const createCart = async (req, res, next) => {
    try {
      const newCart = await service.createCart();
      if (!newCart) res.status(404).json({ msg: "Cannot create cart 🚫" });
      else res.status(200).json(newCart);
    } catch (error) {
      next(error.message);
    }
  };
export const getAllCarts = async (req, res, next) => {
    try {
      const response = await service.getAllCarts();
      res.status(200).json(response);
    } catch (error) {
      next(error.message);
    }
  };
  
  export const getCartById = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await service.getCartById(cid);
      if (!response) res.status(404).json({ msg: "Cart not found 🚫" });
      else res.status(200).json(response);
    } catch (error) {
      next(error.message);
    }
  };
  
  export const updateCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cartUpd = await service.updateCart(cid, req.body);
      if (!cartUpd) res.status(404).json({ msg: "Error updating cart 🚫" });
      else res.status(200).json(cartUpd);
    } catch (error) {
      next(error.message);
    }
  };
  
  export const deleteCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cartDel = await service.deleteCart(cid);
      if (!cartDel) res.status(404).json({ msg: "Cannot delete cart 🚫" });
      else res.status(200).json({ msg: `Cart id: ${cid} deleted` });
    } catch (error) {
      next(error.message);
    }
  };

export const addProductToCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const ProductToAdd = await service.addProductToCart(cid,pid);
      if (!ProductToAdd) res.json({ msg: "Error adding product 🚫" });
      else res.json(ProductToAdd);
    } catch (error) {
      next(error.message);
    }
  };

  export const removefromCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const delProdToUserCart = await service.removefromCart(cid,pid);
      if (!delProdToUserCart) res.json({ msg: "cannot remove product from cart 🚫" });
      else res.json({msg: `the product ${pid} was removed from cart`});
    } catch (error) {
      next(error.message);
    }
  };

  export const updateProdQuantity = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await service.updateProdQuantity(
        cid,
        pid,
        quantity
      );
      if (!updateProdQuantity) res.json({ msg: "cannot update product quantity 🚫" });
      else res.json(updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };

  export const clearCart = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const clearCart = await service.clearCart(cid);
      if (!clearCart) res.json({ msg: "cannot clear this cart 🚫" });
      else res.json(clearCart);
    } catch (error) {
      next(error.message);
    }
  };

  
  export const purchase = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await service.getCartById(cid);

        if (!cart) {
            return res.status(400).send("Carrito no encontrado");
        }

        let ticketProducts = [];
        let productsOutOfStock = [];
        let TotalPurchase = 0;

        for (const product of cart.products) {
            try {
                const dbProduct = await getProductById(product.product);

                if (dbProduct) {
                    if (product.quantity <= dbProduct.stock) {
                        await updateProduct(product.product, { stock: dbProduct.stock - product.quantity });
                        ticketProducts.push(product);
                        TotalPurchase += product.quantity * dbProduct.price;
                        await service.removefromCart(cid, product.product._id);
                    } else {
                        productsOutOfStock.push(product);
                    }
                } else {
                    productsOutOfStock.push(product);
                }
            } catch (error) {
                console.error(`Error processing product ${product.product}:`, error);
                productsOutOfStock.push(product);
            }
        }

        const purchaseUser = await getUserByEmail(req.user.email);

        if (!purchaseUser) {
            return res.status(400).send("Usuario Inexistente");
        }

        const code = uuidv4();

        const ticket = {
            code: code,
            amount: TotalPurchase,
            purchaser: req.user.email,
            purchaserId: purchaseUser[0]._id
        };

        const ticketResponse = await createTicket(ticket);

        if (ticketResponse) {
            return res.status(200).json({ ticket: resTicketDto(ticketResponse[0]), ticketProducts: ticketProducts, productOutOfStock: productsOutOfStock });
        } else {
            return res.status(400).send("No fue posible generar el ticket");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message });
    }
};
