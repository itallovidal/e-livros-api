import { Body, Controller, Post, Response } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zodValidationPipe'

import { bookDTO, IBookDTO } from '../../models/validations/bookDTO'
import { ReadBookService } from '../../models/services/books/readBook.service'

@Controller('books')
export class ReadBookController {
  constructor(private readBookService: ReadBookService) {}

  @Post('read')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Body(new ZodValidationPipe(bookDTO)) payload: IBookDTO,
  ) {
    const email = res['locals'].user as string
    await this.readBookService.execute(payload, email)
  }
}
