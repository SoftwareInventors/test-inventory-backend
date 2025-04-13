import express from 'express';
import { handleCreateCategory } from '../controllers/category.controller';
import validateRequest from '../middlewares/validateRequest';
import { categoryValidationSchema } from '../schemas/category.schema';
import verifyUser from '../middlewares/verifyUser';

const router = express.Router();

router.post(
  '/category',
  validateRequest(categoryValidationSchema),
  verifyUser,
  handleCreateCategory,
);

export const categoryRoutes = router;
