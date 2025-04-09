import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { ProductServices } from './product.service';

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const { meta, result } = await ProductServices.getAllproductFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Products retrieved successfully',
    meta: meta,
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const idOfProduct = req.params.productId;

  const result = await ProductServices.getSingleProductToDb(idOfProduct);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product retrieved successfully',
    data: result,
  });
});

export const ProductControllers = {
  getSingleProduct,
  getAllProduct,
};
