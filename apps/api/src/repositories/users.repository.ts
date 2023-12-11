import { Prisma, User } from '@prisma/client'

export type UsersRepository = {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
}