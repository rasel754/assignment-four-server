import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewires/globalError';
import notFound from './app/middlewires/notFound';
import { AdminRouter } from './app/modules/admin/admin.route';
import { AuthRoutes } from './app/modules/auth/auth.route';
import { orderRouter } from './app/modules/order/order.routes';
import { productRouter } from './app/modules/product/product.routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(
  cors({
    origin: 'https://assignment-four-client-ashy.vercel.app',
    credentials: true,
  }),
);
app.use(cookieParser());

//application routes
app.use('/api/a4', AuthRoutes);
app.use('/api/a4', productRouter);
app.use('/api/a4', orderRouter);
app.use('/api/a4', AdminRouter);

//check application running or not
app.get('/', (req: Request, res: Response) => {
  res.json({
    messsage: 'server running!',
    success: true,
    data: {},
  });
});

//global error handler
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

//export
export default app;
