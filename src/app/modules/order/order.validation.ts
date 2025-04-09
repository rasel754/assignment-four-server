import mongoose from 'mongoose';
import { z } from 'zod';
import { orderStatus } from './order.constants';



const createOrderValidationSchema = z.object({
  body: z.object({
    product: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid product ID',
    }),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    status: z
      .enum([...orderStatus] as [string, ...string[]], {
        message: 'Status must be Pending | Shipping',
      })
      .optional(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
