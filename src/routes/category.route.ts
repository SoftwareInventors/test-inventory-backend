import express from 'express';
import {
  handleCreateCategory,
  handleDeleteCategory,
  handleGetAllCategories,
  handleUpdateCategory,
} from '../controllers/category.controller';
import validateRequest from '../middlewares/validateRequest';
import { categoryValidationSchema } from '../schemas/category.schema';
import verifyUser from '../middlewares/verifyUser';

const router = express.Router();

// create category
router.post(
  '/category',
  validateRequest(categoryValidationSchema),
  verifyUser,
  handleCreateCategory,
);

// get all categories
router.get('/categories', verifyUser, handleGetAllCategories);

// update category by id
router.put('/category/:id', verifyUser, handleUpdateCategory);

// delete category by id
router.delete('/category/:id', verifyUser, handleDeleteCategory);

export const categoryRoutes = router;
