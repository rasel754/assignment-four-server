import { z } from 'zod';
import { productCategories } from './product.constant';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is requird',
        invalid_type_error: 'Name must be a string',
      })
      .trim(),

    brand: z
      .string({
        required_error: 'Brand is requird',
        invalid_type_error: 'Name must be a string',
      })
      .trim(),

    price: z
      .number({
        required_error: 'Price is requird',
        invalid_type_error: 'Price must be a number',
      })
      .min(0, { message: 'Price must be a positive number' }),

    category: z.enum([...productCategories] as [string, ...string[]], {
      message:
        'Category value must be Writing | Office Supplies | Art Supplies | Educational | Technology',
    }),

    image: z.string().trim().optional().default(''),

    description: z
      .string({
        required_error: 'Description is requird',
        invalid_type_error: 'Description must be a string',
      })
      .trim(),

    quantity: z
      .number({
        required_error: 'Quantity is requird',
        invalid_type_error: 'Quantity must be a number',
      })
      .min(0, { message: 'Quantity must be a positive number' }),

    inStock: z.boolean({
      required_error: 'Instock is requird',
      invalid_type_error: 'Instock must be a boolen',
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .trim()
      .optional(), 

    brand: z
      .string({
        required_error: 'Brand is required',
        invalid_type_error: 'Brand must be a string',
      })
      .trim()
      .optional(),

    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .min(0, { message: 'Price must be a positive number' })
      .optional(),

    category: z
      .enum([...productCategories] as [string, ...string[]], {
        message:
          'Category value must be Writing | Office Supplies | Art Supplies | Educational | Technology',
      })
      .optional(),

    image: z.string().trim().optional().default(''),

    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
      })
      .trim()
      .optional(),

    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .min(0, { message: 'Quantity must be a positive number' })
      .optional(),

    inStock: z
      .boolean({
        required_error: 'InStock is required',
        invalid_type_error: 'InStock must be a boolean',
      })
      .optional(),
  }),
});


export const ProductValidatios = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
