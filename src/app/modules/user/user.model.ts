import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import AppError from '../../error/AppError';
import { role } from './user.constant';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      enum: { values: role, message: '{VALUE} is not supported' },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  this.password = hashedPassword;

  next();
});


userSchema.pre('save', async function (next) {
  const isUserAlreadyExistByEmailId = await User.findOne({ email: this.email });
  if (isUserAlreadyExistByEmailId) {
    throw new AppError(409, `${this.email} is Already registered.`);
  }
  next();
});


userSchema.post('save', function (doc, next) {

  doc.password = '';
  next();
});


userSchema.statics.checkUserExistByEmailId = async function (email) {
  const isUserExist = await this.findOne({ email });
  return isUserExist;
};
userSchema.statics.checkLoginPasswordMatch = async function (
  plainTextPassword,
  hashPassword,
) {
  const match = await bcrypt.compare(plainTextPassword, hashPassword);
  return match;
};

export const User = model<TUser, UserModel>('User', userSchema);
