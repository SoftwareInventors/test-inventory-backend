import { NextFunction, Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';
import httpStatus from 'http-status';
import { IUser } from '../interfaces/user.interface';
import { ILoginUser } from '../interfaces/auth.interface';

export async function handleRegisterUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userRegistrationPayload: IUser = req.body;

    const user = await registerUser(userRegistrationPayload);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function handleLoginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userLoginPayload: ILoginUser = req.body;

    const { accessToken } = await loginUser(userLoginPayload);

    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: config.env == 'production',
    // });

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User Logged-in successfully',
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}
