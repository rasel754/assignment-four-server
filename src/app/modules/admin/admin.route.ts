import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { ProductValidatios } from '../product/product.validation';
import { USER_ROLE } from '../user/user.constant';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.post(
  '/product/createProduct',
  auth(USER_ROLE?.admin),
  validateRequest(ProductValidatios.createProductValidationSchema),
  AdminControllers.createProduct,
);

router.delete(
  '/product/deleteProduct/:productId',
  auth(USER_ROLE?.admin),
  AdminControllers.deleteProduct,
);

router.patch(
  '/product/updateProduct/:productId',
  auth(USER_ROLE?.admin),
  validateRequest(ProductValidatios.updateProductValidationSchema),
  AdminControllers.updateProduct,
);

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminControllers.blockedUserByAdmin,
);
export const AdminRouter = router;
