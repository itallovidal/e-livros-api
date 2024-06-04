import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zodValidationPipe'
import { SignupService } from '../../models/services/users/signup.service'
import {
  signupSchemaDTO,
  ISignupSchemaDTO,
} from '../../models/validations/signupSchemaDTO'

@Controller('users')
export class SignupController {
  constructor(
    @Inject(SignupService) private createUserService: SignupService,
  ) {}

  @Post('signup')
  handle(@Body(new ZodValidationPipe(signupSchemaDTO)) payload: ISignupSchemaDTO) {
    this.createUserService.execute(payload)
    return {
      status: 201,
      message: 'User created successfully!',
    }
  }
}
