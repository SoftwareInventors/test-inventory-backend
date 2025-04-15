import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { User_Role } from '../constants/user.constant';

/**
 * Checks if the user is authorized to perform an action
 * @param req Express request object
 * @param res Express response object
 * @param options Authorization options
 * @returns boolean indicating if user is authorized
 */
export const checkAuthorization = (
  req: Request,
  res: Response,
  options: {
    requireAdmin?: boolean;
    requireOwner?: boolean;
    ownerId?: string;
    customMessage?: string;
  },
): boolean => {
  const decodedUser = req.user;

  // Check if user exists
  if (!decodedUser) {
    res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Authentication required',
    });
    return false;
  }

  const {
    requireAdmin = false,
    requireOwner = false,
    ownerId,
    customMessage,
  } = options;

  // Check user permissions
  const isAdmin = decodedUser.role === User_Role.ADMIN;
  const isOwner = ownerId ? decodedUser._id === ownerId : false;

  // If owner is required and user is not owner
  if (!isOwner) {
    res.status(httpStatus.FORBIDDEN).json({
      success: false,
      statusCode: httpStatus.FORBIDDEN,
      message: customMessage || 'You are not authorized to perform this action',
    });
    return false;
  }
  // If admin is required and user is not admin
  if (requireAdmin && !isAdmin) {
    res.status(httpStatus.FORBIDDEN).json({
      success: false,
      statusCode: httpStatus.FORBIDDEN,
      message: customMessage || 'Admin privileges required',
    });
    return false;
  }

  // If owner is required and user is neither admin nor owner
  if (requireOwner && !isAdmin && !isOwner) {
    res.status(httpStatus.FORBIDDEN).json({
      success: false,
      statusCode: httpStatus.FORBIDDEN,
      message: customMessage || 'You are not authorized to perform this action',
    });
    return false;
  }

  return true;
};
