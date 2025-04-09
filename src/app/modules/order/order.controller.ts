import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { OrderServices } from './order.service';


const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrder(
    req.user,
    req.body,
    req.ip!,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order created successfully.',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrder();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Orders retrived successfully.',
    data: result,
  });
});

const getMyOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getMyOrder(req?.user?.email);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User orders retrived successfully.',
    data: result,
  });
});

const acceptOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await OrderServices.acceptOrder(orderId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order accepted successfully.',
    data: result,
  });
});

const cancleOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const result = await OrderServices.cancleOrde(orderId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order deleted successfully.',
    data: result,
  });
});


const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Order verified successfully',
    data: order,
  });
});


export const OrderControllers = {
  createOrder,
  acceptOrder,
  cancleOrder,
  verifyPayment,
  getAllOrder,
  getMyOrder,
  
};
