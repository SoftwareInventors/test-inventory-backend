import z from 'zod';
import { User_Role, User_Status } from '../constants/user.constant';

export const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    serverId: z.string().optional(),
    role: z.enum([User_Role.ADMIN, User_Role.MODERATOR]),
    status: z
      .enum([User_Status.ACTIVE, User_Status.INACTIVE, User_Status.BLOCKED])
      .optional(),
    companyName: z.string().min(1, 'Company name is required'),
    phone: z.string().min(1, 'Phone number is required'),
    lastLogin: z.date().optional(),
  }),
});
