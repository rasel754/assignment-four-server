 
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../error/AppError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleMongooseCastError from '../error/handleMonggoseCastError';
import handleMongooseValidationError from '../error/handleValidationError';
import handleZodError from '../error/handleZodError';
import { TErrorSources, TGenericsErrorResponse } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
  if (error instanceof ZodError) {

    const simplifiedError: TGenericsErrorResponse = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;

  } else if (error instanceof mongoose.Error.ValidationError) {

    const simplifiedError: TGenericsErrorResponse =
      handleMongooseValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;

  } else if (error.name === 'CastError') {

    const simplifiedError: TGenericsErrorResponse =
      handleMongooseCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;

  } else if (error?.code === 11000) {

    const simplifiedError: TGenericsErrorResponse = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;

  } else if (error instanceof AppError) {

    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: '',
        message,
      },
    ];

  } else if (error instanceof Error) {
    message = error?.message;
    errorSources = [
      {
        path: '',
        message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
