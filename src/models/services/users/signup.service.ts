import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'
import {
  ISUserRepository,
  IUsersRepository,
} from '../../repositories/users/users.repository'
import { ISignupSchemaDTO } from '../../validations/signupSchemaDTO'
@Injectable()
export class SignupService {
  constructor(
    @Inject(ISUserRepository) private usersRepository: IUsersRepository,
  ) {}

  async execute(user: ISignupSchemaDTO) {
    const { password, ...data } = user

    const userAlreadyExists = await this.usersRepository.getUserByEmail(
      data.email,
    )

    if (userAlreadyExists) {
      throw new BadRequestException({
        message: 'Email already exists, do you already have an account?',
        field: 'email',
        status: 400,
        error: 'Bad Request',
      })
    }

    const encryptedPassword = await hash(password, 5)

    const newUser = {
      ...data,
      password: encryptedPassword,
    }

    return await this.usersRepository.createUser(newUser)
  }
}
