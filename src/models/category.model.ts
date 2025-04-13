import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

const categorySchema = new Schema<ICategory>(
  {
    categoryName: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Category = model<ICategory>('Category', categorySchema);
