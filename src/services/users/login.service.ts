import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import {
  ISUserRepository,
  IUsersRepository,
} from '../../models/interfaces/users.repository'
import { ILoginSchemaDTO } from '../../models/validations/loginSchemaDTO'

@Injectable()
export class LoginService {
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
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new InternalServerErrorException()
    }

    const { id } = user

    return {
      accessToken: sign(id, process.env.ACCESS_TOKEN_SECRET),
      name: user.name,
    }
  }
}
