import { z } from 'zod'

export const loginSchemaDTO = z.object({
  email: z.string().email({
    message: 'Invalid Email.',
  }),
  password: z.string().min(6, {
    message: 'Password must contain at least 6 characters.',
  }),
})

export interface ILoginSchemaDTO extends z.infer<typeof loginSchemaDTO> {}
