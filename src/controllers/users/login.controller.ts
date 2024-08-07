import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zodValidationPipe'
import { LoginService } from '../../services/users/login.service'
import {
  ILoginSchemaDTO,
  loginSchemaDTO,
} from '../../models/validations/loginSchemaDTO'

@Controller('users')
export class LoginUserController {
  constructor(private loginUserService: LoginService) {}

  @Post('login')
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(loginSchemaDTO)) payload: ILoginSchemaDTO,
  ) {
    const { accessToken, name } = await this.loginUserService.execute(payload)

    return {
      accessToken,
      name,
    }
  }
}
