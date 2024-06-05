import { z } from 'zod'

export const bookDTO = z.object({
  bookID: z.string().min(8, {
    message: 'BookID must contain at least 8 characters.',
  }),
})

export interface IBookDTO extends z.infer<typeof bookDTO> {}
