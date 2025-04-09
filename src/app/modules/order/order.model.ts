import mongoose, { Schema } from 'mongoose';
import { orderStatus } from './order.constants';
import { TOrder } from './order.interface';


const OrderSchema = new mongoose.Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'Product',
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price must be a positive number'],
    },
    status: {
      type: String,
      enum: {
        values: orderStatus,
        message: '{VALUE} is not supported',
      },
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
      payment_status: String,
    },
  },
  {
    timestamps: true,
  },
);



const OrderModel = mongoose.model<TOrder>('Order', OrderSchema);

//export
export default OrderModel;
