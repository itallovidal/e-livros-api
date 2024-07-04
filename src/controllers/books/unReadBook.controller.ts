import { Body, Controller, Delete, Response } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zodValidationPipe'

import { bookDTO, IBookDTO } from '../../models/validations/bookDTO'
import { UnReadBookService } from '../../services/books/unReadBook.service'

@Controller('books')
export class UnReadBookController {
  constructor(private unreadBookService: UnReadBookService) {}

  @Delete('read')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Body(new ZodValidationPipe(bookDTO)) payload: IBookDTO,
  ) {
    const user = res['locals'].user as { id: string }
    await this.unreadBookService.execute(payload, user.id)
  }
}
