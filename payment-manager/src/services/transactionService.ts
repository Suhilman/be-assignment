import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); 

const prisma = new PrismaClient();

interface TransactionData {
  accountId: number;
  amount: number;
  type: 'send' | 'withdraw';
}

export const processTransaction = async (transaction: TransactionData) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: transaction.accountId },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    if (transaction.type === 'withdraw' && account.balance < transaction.amount) {
      throw new Error('Insufficient funds');
    }

    const newBalance = transaction.type === 'withdraw'
      ? account.balance - transaction.amount
      : account.balance + transaction.amount;

    await prisma.account.update({
      where: { id: transaction.accountId },
      data: { balance: newBalance },
    });

    const newTransaction = await prisma.transaction.create({
      data: {
        accountId: transaction.accountId,
        amount: transaction.amount,
        status: transaction.type,
      },
    });

    return newTransaction;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};
