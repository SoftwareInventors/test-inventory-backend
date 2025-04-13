import * as z from 'zod';

export const categoryValidationSchema = z.object({
  body: z.object({
    categoryName: z.string().min(1, 'Category Name is required'),
    user: z.string().min(1, 'User ID is required'),
  }),
});
