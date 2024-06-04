import { ISignupSchemaDTO } from '../../validations/signupSchemaDTO'

export interface IUsersRepository {
  createUser(user: ISignupSchemaDTO): void
  // getUserByID(id: string): Promise<IUser>
  getUserByEmail(email: string): Promise<any>
}

export const ISUserRepository = Symbol('IUsersRepository')
