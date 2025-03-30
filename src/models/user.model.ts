import { Schema, model } from 'mongoose';
import { User_Role, User_Status } from '../constants/user.constant';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config/config';

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    serverId: { type: String, required: false },
    role: {
      type: String,
      enum: Object.values(User_Role),
      default: User_Role.ADMIN,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(User_Status),
      default: User_Status.ACTIVE,
      required: false,
    },
    companyName: { type: String, required: true },
    phone: { type: String, required: true },
    lastLogin: { type: Date, required: false },
  },
  { timestamps: true },
);

// hash the password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(
      this.password,
      config.bcrypt_salt_rounds,
    );
    this.password = hashedPassword;
  }
  next();
});

// prevent duplicate user
UserSchema.pre('save', async function (next) {
  if (this.isModified('email')) {
    const existingUser = await User.findOne({ email: this.email });
    if (existingUser) {
      throw new Error(
        'User with this email address already exists!Try with another email',
      );
    }
  }
  next();
});

export const User = model<IUser>('User', UserSchema);
