import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/auth/register',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.registerUser,
);
router.post(
  '/auth/login',
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/auth/refresh-token',
  // validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.get(
  '/auth/user',
  auth(USER_ROLE?.admin, USER_ROLE?.user),
  AuthControllers.getUser,
);

export const AuthRoutes = router;
