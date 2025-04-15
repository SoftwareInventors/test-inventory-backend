import { Request } from 'express';
import { IProduct } from '../interfaces/product.interface';
import { Product } from '../models/product.model';

export const createProduct = async (productPayload: IProduct) => {
  const newProduct = await Product.create(productPayload);
  return newProduct;
};

export const getAllProducts = async (req: Request) => {
  const products = await Product.find({ user: req.query.id }).populate([
    { path: 'category' },
    { path: 'user', select: '-password' },
  ]);
  return products;
};
