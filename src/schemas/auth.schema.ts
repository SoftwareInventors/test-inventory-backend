import * as z from 'zod';
import { User_Role, User_Status } from '../constants/user.constant';

export const userRegistrationValidationSchema = z.object({
  body: z.object({
    firstName: z
      .string({
        required_error: 'First Name is required',
        invalid_type_error: 'First Name must be a string',
      })
      .min(1, 'First Name cannot be empty'),

    lastName: z
      .string({
        required_error: 'Last Name is required',
        invalid_type_error: 'Last Name must be a string',
      })
      .min(1, 'Last Name cannot be empty'),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email'),

    role: z.enum([User_Role.ADMIN, User_Role.MODERATOR], {
      required_error: 'Role is required',
      invalid_type_error: 'Role must be ADMIN or MODERATOR',
    }),

    status: z
      .enum([User_Status.ACTIVE, User_Status.INACTIVE, User_Status.BLOCKED], {
        invalid_type_error: 'Status must be ACTIVE, INACTIVE or BLOCKED',
      })
      .optional(),

    companyName: z
      .string({
        required_error: 'Company name is required',
        invalid_type_error: 'Company name must be a string',
      })
      .min(1, 'Company name cannot be empty'),

    phone: z
      .string({
        required_error: 'Phone number is required',
        invalid_type_error: 'Phone must be a string',
      })
      .min(11, 'Phone number must be at least 11 digits')
      .max(14, 'Invalid phone number'),

    lastLogin: z.date().optional(),
  }),
});

export const userLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email('Invalid email'),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must be at least 6 characters'),
  }),
});
