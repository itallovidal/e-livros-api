import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import { ILoginSchemaDTO } from '../validation'
import {
  ISUserRepository,
  IUsersRepository,
} from '../repositories/usersRepository'

@Injectable()
export class LoginUserService {
  constructor(
    @Inject(ISUserRepository) private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: ILoginSchemaDTO) {
    const user = await this.usersRepository.getUserByEmail(email)

    console.log(user)

    if (!user) {
      throw new NotFoundException({
        message: 'Email not found in the database.',
        field: 'email',
        status: 404,
        error: 'Not Found',
      })
    }

    const result = await compare(password, user.password)

    if (!result) {
      throw new ForbiddenException({
        message: 'Incorrect password, please try again.',
        field: 'password',
        status: 403,
        error: 'forbidden',
      })
    }
    // TODO: corrigir essa merda aqui que tá ruim
    if (process.env.ACCESS_TOKEN_SECRET) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, email, ...data } = user

      return {
        accessToken: sign(data, process.env.ACCESS_TOKEN_SECRET),
        name: user.name,
      }
    }

    throw new InternalServerErrorException()
  }
}
