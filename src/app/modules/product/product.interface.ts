/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type TCategory =
  | 'Office Supplies'
  | 'Educational'
  | 'Writing'
  | 'Art Supplies'
  | 'Technology';

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: TCategory;
  image: string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
};
export interface ProductModel extends Model<TProduct> {
  findProductById(productId: string): Promise<TProduct>;
}
