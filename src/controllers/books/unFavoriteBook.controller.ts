import { Body, Controller, Delete, Response } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zodValidationPipe'

import {
  bookDTO,
  IBookDTO,
} from '../../models/validations/bookDTO'
import { UnFavoriteBookService } from '../../models/services/books/unFavoriteBook.service'

@Controller('books')
export class UnFavoriteBookController {
  constructor(private unfavoriteBookService: UnFavoriteBookService) {}

  @Delete('favorite')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Body(new ZodValidationPipe(bookDTO)) payload: IBookDTO,
  ) {
    const email = res['locals'].user as string

    await this.unfavoriteBookService.execute(payload, email)
  }
}
