import { Response } from 'express';

type TMeta = { page: number; limit: number; total: number; totalPage: number };

type TRecive<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: { page: number; limit: number; total: number; totalPage: number };
  data?: T;
};

type TReturn<T> = {
  success: boolean;
  message: string;
  meta?: TMeta;
  data?: T;
};

const sendResponse = <T>(
  res: Response,
  data: TRecive<T>,
): Response<TReturn<T>> => {

  const responseObj = data?.data

    ? {
        success: data?.success,
        message: data?.message,
        statusCode: data?.statusCode,
        meta: data?.meta,
        data: data?.data,
      }
    : {
        success: data?.success,
        message: data?.message,
        statusCode: data?.statusCode,
      };

  return res.status(data?.statusCode).json(responseObj);
  
};
export default sendResponse;
