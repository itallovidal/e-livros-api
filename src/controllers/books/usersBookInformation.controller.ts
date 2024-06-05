import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Response,
} from '@nestjs/common'

import { UserBookInformationService } from '../../models/services/books/userBookInformation.service'

@Controller('books')
export class UsersBookInformationController {
  constructor(private userBookInformationService: UserBookInformationService) {}

  @Get('about/:bookID')
  async handle(
    @Response({ passthrough: true }) res: Response,
    @Param('bookID') bookID: string,
  ) {
    if (!bookID) {
      throw new BadRequestException('You need specify the book id.')
    }

    const user = res['locals'].user as { id: string }
    return await this.userBookInformationService.execute({ bookID }, user.id)
  }
}
