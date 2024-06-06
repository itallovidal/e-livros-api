import { ISignupSchemaDTO } from '../../validations/signupSchemaDTO'
import { IUserDAO } from '../../entities/IUser.dao'

export interface IUsersRepository {
  createUser(user: ISignupSchemaDTO): Promise<void>
  // getUserByID(id: string): Promise<IUser>
  getUserByEmail(email: string): Promise<IUserDAO>
}

export const ISUserRepository = Symbol('IUsersRepository')
