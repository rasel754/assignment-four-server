


import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found !!',
    statusCode: 404,
    error: '',
    stack: '',
  });
};

export default notFound;
