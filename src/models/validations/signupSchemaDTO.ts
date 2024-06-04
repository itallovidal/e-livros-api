import { z } from 'zod'

// schema é um objeto de validacão qualquer
export const signupSchemaDTO = z.object({
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

export interface ISignupSchemaDTO extends z.infer<typeof signupSchemaDTO> {}
