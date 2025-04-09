import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (validationSchema: AnyZodObject) => {
  return async function (req: Request, res: Response, next: NextFunction) {

    try {
      await validationSchema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      next();
    } catch (err) {

      next(err);
    }
  };
};
export default validateRequest;
