import { z } from 'zod';
import { role } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be string',
      })
      .email({ message: 'Invalid email address' }),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be string',
    }),
    role: z
      .enum([...role] as [string, ...string[]], {
        message: 'Role must be admin | user',
      })
      .optional(),
    isBlocked: z
      .boolean({
        invalid_type_error: 'isBlocked must be boolean',
      })
      .optional(),
  }),
});



export const UserValidations = {
  createUserValidationSchema,
};
