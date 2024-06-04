import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ZodValidationPipe } from './pipes/zodValidationPipe'
import { ILoginSchemaDTO, loginSchemaDTO } from '../models/validation'
import { LoginUserService } from '../models/services/loginUser.service'

@Controller('users')
export class LoginUserController {
  constructor(private loginUserService: LoginUserService) {}

  @Post('login')
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(loginSchemaDTO)) payload: ILoginSchemaDTO,
  ) {
    // console.log(payload)
    const { accessToken, name } = await this.loginUserService.execute(payload)

    return {
      accessToken,
      name,
    }
  }
}
