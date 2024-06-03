import { ICreateUser } from '../validation'

export interface IUsersRepository {
  createUser(user: ICreateUser): void
  // getUserByID(id: string): Promise<IUser>
  getUserByEmail(email: string): Promise<any>
}

export const ISUserRepository = Symbol('IUsersRepository')
