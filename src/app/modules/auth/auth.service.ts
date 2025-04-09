import config from '../../config';
import AppError from '../../error/AppError';
import { TUser, TUserRole } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.uitls';

const registerUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User.findOne({ email: payload?.email });

  if (!isUserExist) {
    throw new AppError(404, 'User not found!');
  }

  if (isUserExist?.isBlocked) {
    throw new AppError(403, 'User is blocked!');
  }

  const passwordMatch = await User.checkLoginPasswordMatch(
    payload?.password,
    isUserExist?.password,
  );
  if (!passwordMatch) {
    throw new AppError(403, 'Password does not matched!');
  }

  const jwtPayload = {
    email: isUserExist?.email,
    role: isUserExist?.role as TUserRole,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};
const getAllUser = async (userEmail: string) => {
  const isUserExist = await User.checkUserExistByEmailId(userEmail);
  if (!isUserExist) {
    throw new AppError(404, 'User not exist!');
  }
  if (isUserExist?.isBlocked) {
    throw new AppError(403, 'The user is blocked!');
  }
  return isUserExist;
};

const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email } = decoded;

  const user = await User.checkUserExistByEmailId(email);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked) {
    throw new AppError(403, 'This user is blocked !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  return {
    token: accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
  refreshToken,
  getAllUser,
};
