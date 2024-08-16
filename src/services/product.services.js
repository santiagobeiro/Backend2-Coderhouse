import ProductDao from "../Daos/product.dao.js";

//instancia de la clase ProductDao

const productDao = new ProductDao();

export const getAllProducts = async (page, limit, title, sort) => {
  try {
    return await productDao.getAllProducts(page, limit, title, sort);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const foundProduct = await productDao.getProductById(id);
    if (!foundProduct) return false;
    else return foundProduct;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (obj) => {
  try {
    const newProduct = await productDao.createProduct(obj);
    if (!newProduct) return false;
    else return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, obj) => {
  try {
    const productUpdate = await productDao.updateProduct(id, obj);
    if (!productUpdate) return false;
    else return productUpdate;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const productToDelete = await productDao.deleteProduct(id);
    if (!productToDelete) return false;
    else return productToDelete;
  } catch (error) {
    console.log(error);
  }
};