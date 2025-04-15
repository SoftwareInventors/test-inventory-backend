import { Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const productSchema = new Schema<IProduct>(
  {
    productName: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Product = model<IProduct>('Product', productSchema);
