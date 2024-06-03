import { Body, Controller, Inject, Post } from '@nestjs/common'
import { ZodValidationPipe } from './pipes/zodValidationPipe'
import { createUserSchema, ICreateUser } from '../models/validation'
import { CreateUserService } from '../models/services/createUserService'

@Controller('users')
export class CreateUserController {
  constructor(
    @Inject(CreateUserService) private createUserService: CreateUserService,
  ) {}

  @Post('signup')
  handle(@Body(new ZodValidationPipe(createUserSchema)) payload: ICreateUser) {
    this.createUserService.execute(payload)
    return {
      status: 201,
      message: 'User created successfully!',
    }
  }
}
