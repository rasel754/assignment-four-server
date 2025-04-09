import express from 'express';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

const router = express.Router();

router.post(
  '/createOrder',
  auth(USER_ROLE.user),
  validateRequest(OrderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

router.get('/allOrders', auth(USER_ROLE.admin), OrderControllers.getAllOrder);
router.get('/myOrders', auth(USER_ROLE.user), OrderControllers.getMyOrder);

router.patch(
  '/acceptOrder/:orderId',
  auth(USER_ROLE.admin),
  OrderControllers.acceptOrder,
);

router.delete(
  '/cancleOrder/:orderId',
  auth(USER_ROLE?.admin),
  OrderControllers.cancleOrder,
);

router.get(
  '/orders/verify',
  auth(USER_ROLE.user),
  OrderControllers.verifyPayment,
);


export const orderRouter = router;
