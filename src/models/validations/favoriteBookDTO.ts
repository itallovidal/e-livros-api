import { z } from 'zod'

export const favoriteBookDTO = z.object({
  bookID: z.string().min(8, {
    message: 'BookID must contain at least 8 characters.',
  }),
})

export interface IFavoriteBookDTO extends z.infer<typeof favoriteBookDTO> {}
