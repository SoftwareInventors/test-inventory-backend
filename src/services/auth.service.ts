import httpStatus from 'http-status';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import { User_Role, User_Status } from '../constants/user.constant';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config/config';
import { ILoginUser } from '../interfaces/auth.interface';
import { ApiError } from '../errors/ApiError';
import { comparePassword } from '../utils/compasePassword';

export const registerUser = async (userRegistrationPayload: IUser) => {
  const userExists = await User.findOne({
    email: userRegistrationPayload.email,
  });

  if (userExists) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      `User with this ${userRegistrationPayload.email} email already exists!`,
    );
  }
  // check whether user has an account
  userRegistrationPayload.role = User_Role.ADMIN;

  const newUser = await User.create(userRegistrationPayload);
  return newUser;
};

export const loginUser = async (userLoginPayload: ILoginUser) => {
  const user = await User.findOne({ email: userLoginPayload.email });

  // check whether user has an account
  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      `User with this ${userLoginPayload.email} email is Not Found!`,
    );
  }

  // check whether user is blocked or inactive
  if (user?.status === User_Status.INACTIVE) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'User is inactive! Please contact admin.',
    );
  }
  if (user?.status === User_Status.BLOCKED) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Your account has been suspended. Please contact our support team for assistance.',
    );
  }

  // check password is matched
  const isPasswordMatched = await comparePassword(
    userLoginPayload.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password!');
  }

  // Update the lastLogin field with the current date and time
  user.lastLogin = new Date();

  await user.save();

  const jwtPayload: JwtPayload = {
    _id: user?._id,
    email: user?.email,
    role: user?.role,
    status: user?.status,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.access_token_secret_key as string,
    { expiresIn: '1d' },
  );

  const refreshToken = jwt.sign(
    jwtPayload,
    config.refresh_token_secret_key as string,
    { expiresIn: '7d' },
  );

  const userData = {
    _id: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    role: user?.role,
    status: user?.status,
    companyName: user?.companyName,
    phone: user?.phone,
    lastLogin: user.lastLogin,
  };
  return { accessToken, refreshToken, userData };
};
