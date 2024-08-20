import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateTransactionDTO {
  accountId: number;
  amount: number;
  status: string;
}

export class TransactionModel {
  static async createTransaction(data: CreateTransactionDTO) {
    const { accountId, amount, status } = data;

    // Find the related account
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    if (status === 'withdraw' && account.balance < amount) {
      throw new Error('Insufficient funds');
    }

    const newBalance = status === 'withdraw' ? account.balance - amount : account.balance + amount;

    await prisma.account.update({
      where: { id: accountId },
      data: { balance: newBalance },
    });

    const transaction = await prisma.transaction.create({
      data: {
        accountId,
        amount,
        status,
      },
    });

    return transaction;
  }

  static async getTransactionsByAccountId(accountId: number) {
    return prisma.transaction.findMany({
      where: { accountId },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  static async getTransactionById(id: number) {
    return prisma.transaction.findUnique({
      where: { id },
    });
  }
}
