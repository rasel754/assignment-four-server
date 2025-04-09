import mongoose from 'mongoose';
import { productCategories } from './product.constant';
import { ProductModel, TProduct } from './product.interface';

const ProductSchema = new mongoose.Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'category is required'],
      enum: {
        values: productCategories,
        message: '{VALUE} is not supported.',
      },
    },
    image: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'description is required'],
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.statics.findProductById = async function (productId: string) {
  const existingProduct = await StationeryProductModel.findById(productId);
  return existingProduct;
};
//create model and export
export const StationeryProductModel = mongoose.model<TProduct, ProductModel>(
  'Product',
  ProductSchema,
);
