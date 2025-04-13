import { ICategory } from '../interfaces/category.interface';
import { Category } from '../models/category.model';

export const createCategory = async (categoryPayload: ICategory) => {
  const newCategory = await Category.create(categoryPayload);
  return newCategory;
};
