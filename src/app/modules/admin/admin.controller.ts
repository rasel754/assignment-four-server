import { Request, Response } from 'express';
import catchAsync from '../../uitls/catchAsync';
import sendResponse from '../../uitls/sendResponse';
import { AdminServices } from './admin.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {

  const { _id, brand, price, category, description, quantity, inStock } =
    await AdminServices.createProduct(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product created successfully',
    data: {
      _id,
      brand,
      price,
      category,
      description,
      quantity,
      inStock,
    },
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {

  const productId = req.params.productId;
  const productData = req.body;

  const result = await AdminServices.updateProduct(
    productId,
    productData,
  );


  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product updated successfully...',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {

  const productId = req.params.productId;

  const result = await AdminServices.deleteProduct(productId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Product deleted successfully',
    data: result,
  });
});

const blockedUserByAdmin = catchAsync(async (req: Request, res: Response) => {

  const { userId } = req.params;
  await AdminServices.blockedUserByAdm(req.user, userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});

export const AdminControllers = {
  createProduct,
  updateProduct,
  deleteProduct,
  blockedUserByAdmin,
};
