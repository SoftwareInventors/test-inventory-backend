import { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  categoryName: string;
  user: Schema.Types.ObjectId;
}
