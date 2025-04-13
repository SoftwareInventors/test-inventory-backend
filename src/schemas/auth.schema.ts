import z from 'zod';
import { User_Role, User_Status } from '../constants/user.constant';

export const userRegistrationValidationSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email'),
    serverId: z.string().optional(),
    role: z.enum([User_Role.ADMIN, User_Role.MODERATOR]),
    status: z
      .enum([User_Status.ACTIVE, User_Status.INACTIVE, User_Status.BLOCKED])
      .optional(),
    companyName: z.string().min(1, 'Company name is required'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .length(11, 'Phone Number must be 11 digits'),
    lastLogin: z.date().optional(),
  }),
});

export const userLoginValidationSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email'),
    serverId: z.string().optional(),
    role: z.enum([User_Role.ADMIN, User_Role.MODERATOR]),
    status: z
      .enum([User_Status.ACTIVE, User_Status.INACTIVE, User_Status.BLOCKED])
      .optional(),
    companyName: z.string().min(1, 'Company name is required'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .length(11, 'Phone Number must be 11 digits'),
    lastLogin: z.date().optional(),
  }),
});
