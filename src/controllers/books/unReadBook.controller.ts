import { Body, Controller, Delete, Response } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zodValidationPipe'

import { bookDTO, IBookDTO } from '../../models/validations/bookDTO'
import { UnReadBookService } from '../../models/services/books/unReadBook.service'

@Controller('books')
export class UnReadBookController {
  constructor(private unreadBookService: UnReadBookService) {}

  @Delete('read')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Body(new ZodValidationPipe(bookDTO)) payload: IBookDTO,
  ) {
    const email = res['locals'].user as string
    await this.unreadBookService.execute(payload, email)
  }
}
