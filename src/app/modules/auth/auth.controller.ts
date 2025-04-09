import { Request, Response } from 'express';
import config from '../../config';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { AuthServices } from './auth.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  const { _id, name, email, role, isBlocked } = result.toObject();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
    data: {
      _id,
      name,
      email,
      role,
      isBlocked,
    },
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await AuthServices.loginUser(req.body);

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: {
      token: accessToken,
    },
  });
});

const getUser = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await AuthServices.getAllUser(email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrived successfull',
    data: {
      name: result?.name,
      email: result?.email,
      role: result?.role,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  refreshToken,
  getUser,
};
