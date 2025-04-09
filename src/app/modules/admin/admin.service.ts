import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { TProduct } from '../product/product.interface';
import { User } from '../user/user.model';
import { StationeryProductModel } from '../product/product.model';

const createProduct = async (productData: TProduct) => {
  const isProductExist = await StationeryProductModel.findOne({
    name: productData?.name,
    category: productData?.category,
    isDeleted: false,
  });

  if (isProductExist) {
    throw new AppError(409, 'Product already exist!');
  }
  const result = await StationeryProductModel.create(productData);
  return result;
};

const updateProduct = async (id: string, data: TProduct) => {
  const isDeleted = await StationeryProductModel.findOne({
    _id: id,
    isDeleted: true,
  });

  if (isDeleted) {
    throw new AppError(404, 'Product not found!');
  }

  const product = await StationeryProductModel.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found!');
  }
  const result = await StationeryProductModel.findByIdAndUpdate(id, data, {
    new: true,
  }).select('name brand price category description quantity inStock image');
  return result;
};

const deleteProduct = async (id: string) => {
  const isDeleted = await StationeryProductModel.findOne({
    _id: id,
    isDeleted: true,
  });
  if (isDeleted) {
    throw new AppError(404, 'Product not found!');
  }

  const product = await StationeryProductModel.findById(id);

  if (!product) {
    throw new AppError(404, 'Product not found!');
  }
  const result = await StationeryProductModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

const blockedUserByAdm = async (
  authenticateUserInfo: JwtPayload,
  userId: string,
) => {
  const isAdminExist = await User.checkUserExistByEmailId(
    authenticateUserInfo?.email,
  );

  if (!isAdminExist) {
    throw new AppError(404, 'Admin not found!');
  }

  if (isAdminExist?.isBlocked) {
    throw new AppError(403, 'Admin is already blocked!');
  }
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(404, 'User not found!');
  }

  if (isUserExist.isBlocked) {
    throw new AppError(403, 'User is already blocked!');
  }
  if (isUserExist && isUserExist.role !== 'user') {
    throw new AppError(403, 'You may provided admin id!');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    {
      new: true,
    },
  );
  return result;
};
//export
export const AdminServices = {
  createProduct,
  updateProduct,
  deleteProduct,
  blockedUserByAdm,
};
