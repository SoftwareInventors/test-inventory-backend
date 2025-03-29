import express from 'express';
import {
  handleLoginUser,
  handleRegisterUser,
} from '../controllers/auth.controller';


const router = express.Router();

router.post('/register', handleRegisterUser);

router.post('/login', handleLoginUser);

//** will implement these services later! */

// router.patch(
//   '/change-password',
//   authorize(User_Role.USER, User_Role.ADMIN, User_Role.SUPER_ADMIN),
//   authControllers.handleChangePassword,
// );

// router.post(
//   '/forget-password',
//   authorize(User_Role.USER, User_Role.ADMIN, User_Role.SUPER_ADMIN),
//   authControllers.handleForgetPassword,
// );

// router.post(
//   '/reset-password',
//   authorize(User_Role.USER, User_Role.ADMIN, User_Role.SUPER_ADMIN),
//   authControllers.handleForgetPassword,
// );

// // if existing refresh token is expired then this refresh token route will call from the client side
// router.post('/refresh-token', authControllers.handleGenerateNewRefreshToken);

export const authRoutes = router;
