import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import { User_Role } from '../constants/user.constant';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config/config';
import { ILoginUser } from '../interfaces/auth.interface';
// import { generateCustomId } from '../utils/generateCustomId';

export const registerUser = async (userRegistrationPayload: IUser) => {
  userRegistrationPayload.role = User_Role.ADMIN;

  // todo: Generated custom id
  // const customId = await generateCustomId(userPayload.role);
  // userPayload.id = customId;

  const newUser = await User.create(userRegistrationPayload);
  return newUser;
};

export const loginUser = async (userLoginPayload: ILoginUser) => {
  const user = await User.findOne({ email: userLoginPayload.email });

  // todo: we will implement this when we will have the ApiError class
  // if (!user) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found!');
  // }

  // todo: we will implement this when we will have the ApiError class
  // if (
  //   user?.status === User_Status.BLOCKED ||
  //   user?.status === User_Status.INACTIVE
  // ) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'User is Blocked!');
  // }

  // const isPasswordMatched = await comparePassword(
  //   userLoginPayload.password,
  //   user?.password,
  // );

  // todo: we will implement this when we will have the ApiError class
  // if (!isPasswordMatched) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password!');
  // }

  const jwtPayload: JwtPayload = {
    email: user?.email,
    role: user?.role,
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

  return { accessToken, refreshToken };
};
