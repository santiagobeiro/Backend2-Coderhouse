import { ProductModel } from "./models/product.model.js";

export default class ProductDao {
  async getAllProducts(page = 1, limit = 10, title, sort) {
    try {
      const filter = title ? { 'title': title } : {};
      let sortOrder = {};
      if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
      const response = await ProductModel.paginate(filter, { page, limit, sort: sortOrder });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
