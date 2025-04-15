import * as z from 'zod';

export const productValidateSchema = z.object({
  body: z.object({
    productName: z
      .string({
        required_error: 'Product name is required',
        invalid_type_error: 'Product name must be a string',
      })
      .min(1, 'Product name cannot be empty'),

    stock: z
      .number({
        required_error: 'Stock is required',
        invalid_type_error: 'Stock must be a number',
      })
      .min(0, 'Stock must be zero or more'),

    status: z.enum(['active', 'inactive']).optional(),

    category: z.string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    }),

    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .min(0, 'Price must be a positive number'),

    user: z
      .string({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a string',
      })
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ObjectId'),
  }),
});
