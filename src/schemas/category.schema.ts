import * as z from 'zod';

export const categoryValidationSchema = z.object({
  body: z.object({
    categoryName: z
      .string({
        required_error: 'Category Name is required',
        invalid_type_error: 'Category Name must be a string',
      })
      .min(1, 'Category Name cannot be empty'),

    user: z
      .string({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a string',
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ObjectId'),
  }),
});
