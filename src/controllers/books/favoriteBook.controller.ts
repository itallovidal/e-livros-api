import { Body, Controller, Post, Response } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zodValidationPipe'

import { bookDTO, IBookDTO } from '../../models/validations/bookDTO'
import { FavoriteBookService } from '../../models/services/books/favoriteBook.service'

@Controller('books')
export class FavoriteBookController {
  constructor(private favoriteBookService: FavoriteBookService) {}

  @Post('favorite')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Body(new ZodValidationPipe(bookDTO)) payload: IBookDTO,
  ) {
    const email = res['locals'].user as string

    await this.favoriteBookService.execute(payload, email)
  }
}
