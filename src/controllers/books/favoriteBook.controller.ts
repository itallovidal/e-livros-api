import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zodValidationPipe'

import {
  favoriteBookDTO,
  IFavoriteBookDTO,
} from '../../models/validations/favoriteBookDTO'

@Controller('books')
export class FavoriteBookController {
  // constructor(private loginUserService: LoginService) {}

  @Post('favorite')
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(favoriteBookDTO)) payload: IFavoriteBookDTO,
  ) {
    console.log(payload)
    return 'livro favoritado ra'
  }
}
