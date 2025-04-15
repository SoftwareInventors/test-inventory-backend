import express from 'express';
// import verifyUser from '../middlewares/verifyUser';
import {
  handleCreateProduct,
  handleGetAllProduct,
} from '../controllers/product.controller';
import validateRequest from '../middlewares/validateRequest';
import { productValidateSchema } from '../schemas/product.schema';
import verifyUser from '../middlewares/verifyUser';

const router = express.Router();

router.post(
  '/product',
  validateRequest(productValidateSchema),
  verifyUser,
  handleCreateProduct,
);
router.get('/product', verifyUser, handleGetAllProduct);

export const productRoutes = router;
