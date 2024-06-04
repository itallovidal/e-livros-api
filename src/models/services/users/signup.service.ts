import { Inject, Injectable } from '@nestjs/common'
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
    const encryptedPassword = await hash(password, 5)

    const newUser = {
      ...data,
      password: encryptedPassword,
    }

    return this.usersRepository.createUser(newUser)
  }
}
