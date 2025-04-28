import express from 'express';
// import verifyUser from '../middlewares/verifyUser';
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleGetAllProduct,
  handleUpdateProduct,
} from '../controllers/product.controller';
import validateRequest from '../middlewares/validateRequest';
import { productValidateSchema } from '../schemas/product.schema';
import verifyUser from '../middlewares/verifyUser';

const router = express.Router();

// create product
router.post(
  '/product',
  validateRequest(productValidateSchema),
  verifyUser,
  handleCreateProduct,
);
// get all products with query params like "?id=123"
router.get('/products', verifyUser, handleGetAllProduct);

// update product by id
router.put('/product/:id', verifyUser, handleUpdateProduct);

// delete product by id
router.delete('/product/:id', verifyUser, handleDeleteProduct);

export const productRoutes = router;
