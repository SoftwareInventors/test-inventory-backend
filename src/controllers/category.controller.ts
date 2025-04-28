import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '../services/category.service';
import { User_Role } from '../constants/user.constant';
import { checkAuthorization } from '../utils/authorization';

export const handleCreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const decodedUser = req.user;

    // Check if user exists
    if (!decodedUser) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Authentication required to create a category',
      });
      return;
    }

    // Check user permissions
    const isAdmin = decodedUser.role === User_Role.ADMIN;
    const isOwner = decodedUser._id === req.body.user;

    if (!isAdmin && !isOwner) {
      res.status(httpStatus.FORBIDDEN).json({
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: 'You are not authorized to create a category',
      });
      return;
    }

    // Create category
    const category = await createCategory(req.body);

    // Send success response
    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Check authorization
    const isAuthorized = checkAuthorization(req, res, {
      requireAdmin: true,
      ownerId: req.body.user,
      customMessage: 'You are not authorized to get all categories',
    });

    if (!isAuthorized) return;

    const categories = await getAllCategories();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const handleUpdateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const isAuthorized = checkAuthorization(req, res, {
      requireAdmin: true,
      ownerId: req.body.user,
      customMessage: 'You are not authorized to get all categories',
    });

    if (!isAuthorized) return;

    const category = await updateCategory(req.params.id, req.body);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const isAuthorized = checkAuthorization(req, res, {
      requireAdmin: true,
      ownerId: req.body.user,
      customMessage: 'You are not authorized to delete a category',
    });

    if (!isAuthorized) return;

    await deleteCategory(req.params.id);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
