import { ISignupSchemaDTO } from '../validations/signupSchemaDTO'
import { IUser } from '../entities/IUser'

export interface IUsersRepository {
  createUser(user: ISignupSchemaDTO): Promise<void>
  getUserByID(userID: string): Promise<IUser | null>
  getUserByEmail(email: string): Promise<IUser | null>
}

export const ISUserRepository = Symbol('IUsersRepository')
