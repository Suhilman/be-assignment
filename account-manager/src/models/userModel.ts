import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export interface UserInput {
  email: string;
  password: string;
}

export interface UserOutput {
  id: number;
  email: string;
}

export const createUser = async (input: UserInput): Promise<UserOutput> => {
  const hashedPassword = await bcrypt.hash(input.password, 10);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return user;
};

export const getUserByEmail = async (email: string): Promise<UserOutput | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
    },
  });

  return user;
};

export const verifyUserPassword = async (email: string, password: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });

  if (!user) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};
