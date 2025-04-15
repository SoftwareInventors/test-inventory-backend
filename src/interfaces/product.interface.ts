import { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  stock: number;
  status: 'active' | 'inactive';
  category: Schema.Types.ObjectId;
  price: number;
  user: Schema.Types.ObjectId;
}
