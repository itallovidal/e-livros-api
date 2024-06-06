import { ISignupSchemaDTO } from '../../validations/signupSchemaDTO'
import { IUserDAO } from '../../entities/IUser.dao'

export interface IUsersRepository {
  createUser(user: ISignupSchemaDTO): Promise<void>
  getUserByID(userID: string): Promise<IUserDAO | null>
  getUserByEmail(email: string): Promise<IUserDAO | null>
}

export const ISUserRepository = Symbol('IUsersRepository')
