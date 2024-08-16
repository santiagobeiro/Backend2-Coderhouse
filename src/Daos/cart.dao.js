import { CartModel } from "./models/cart.model.js";

export default class CartDao {
  async createCart() {
    try {
      return await CartModel.create({
        products: [],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCarts() {
    try {
      return await CartModel.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      return await CartModel.findById(id).populate("products.product");
    } catch (error) {
      console.log(error);
    }
  }
  async updateCart(id, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(id) {
    try {
      return await CartModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async isInCart(cartId, productId){
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: productId } }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const prodInCart = await this.isInCart(cartId, productId);
        if(prodInCart){
          return await CartModel.findOneAndUpdate(
            { _id: cartId, 'products.product': productId },
            { $set: { 'products.$.quantity': prodInCart.products[0].quantity + 1 } },
            { new: true }
          );
        } else {
          return await CartModel.findByIdAndUpdate(
            cartId,
            { $push: { products: { product: productId } } },
            { new: true }
          )
        }
    } catch (error) {
      console.log(error);
    }
  }

  async removefromCart(cartId, productId) {
    try {
      return await CartModel.findByIdAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: productId } } },
        { new: true }
      )
    } catch (error) {
      console.log(error);
    }
  }

  
  async updateProdQuantity(cartId, productId, quantity) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cartId, 'products.product': productId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(cartId) {
    try {
     return await CartModel.findOneAndUpdate(
      { _id: cartId },
      { $set: { products: [] } },
      { new: true }
     )
    } catch (error) {
      console.log(error);
    }
  }
}
