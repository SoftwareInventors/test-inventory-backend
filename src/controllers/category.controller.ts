import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { createCategory } from '../services/category.service';
import { User_Role } from '../constants/user.constant';

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
