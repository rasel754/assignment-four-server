import express from 'express';

import { ProductControllers } from './product.controller';
const router = express.Router();

router.get('/products', ProductControllers.getAllProduct);

router.get('/product/singleProduct/:productId', ProductControllers.getSingleProduct);



export const productRouter = router;
