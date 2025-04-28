import { Request } from 'express';
import { IProduct } from '../interfaces/product.interface';
import { Product } from '../models/product.model';

// create product
export const createProduct = async (productPayload: IProduct) => {
  const newProduct = await Product.create(productPayload);
  return newProduct;
};

// get all products
export const getAllProducts = async (req: Request) => {
  const products = await Product.find({ user: req.query.id }).populate([
    { path: 'category' },
    { path: 'user', select: '-password' },
  ]);
  return products;
};

// update product
export const updateProduct = async (id: string, productPayload: IProduct) => {
  const product = await Product.findByIdAndUpdate(id, productPayload, {
    new: true,
  });
  return product;
};

// delete product
export const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
