import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { createProduct, getAllProducts } from '../services/product.service';
import { checkAuthorization } from '../utils/authorization';

export const handleCreateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check authorization
    const isAuthorized = checkAuthorization(req, res, {
      requireOwner: true,
      ownerId: req.body.user,
      customMessage: 'You are not authorized to create a product',
    });

    if (!isAuthorized) return;

    const product = await createProduct(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check authorization
    const isAuthorized = checkAuthorization(req, res, {
      requireAdmin: true,
      ownerId: req.query.id as string,
      customMessage: 'You are not authorized to get all products',
    });

    if (!isAuthorized) return;

    const products = await getAllProducts(req);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
