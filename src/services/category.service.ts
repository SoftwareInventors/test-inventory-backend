import { ICategory } from '../interfaces/category.interface';
import { Category } from '../models/category.model';
import { ApiError } from '../errors/ApiError';
import httpStatus from 'http-status';
export const createCategory = async (categoryPayload: ICategory) => {
  const newCategory = await Category.create(categoryPayload);
  return newCategory;
};

export const getAllCategories = async () => {
  const categories = await Category.find();
  return categories;
};

export const updateCategory = async (
  id: string,
  categoryPayload: ICategory,
) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    categoryPayload,
    {
      new: true,
    },
  );

  if (!updatedCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return updatedCategory;
};

export const deleteCategory = async (id: string) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return deletedCategory;
};
