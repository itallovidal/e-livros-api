import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email({
    message: 'Invalid Email.',
  }),
  password: z.string().min(6, {
    message: 'Password must contain at least 6 characters.',
  }),
  name: z.string().min(3, {
    message: 'Name must contain at least 3 characters.',
  }),
})

export interface ICreateUser extends z.infer<typeof createUserSchema> {}
