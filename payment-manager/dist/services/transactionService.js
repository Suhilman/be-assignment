"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTransaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const processTransaction = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the account
    const account = yield prisma.account.findUnique({
        where: { id: transaction.accountId },
    });
    if (!account) {
        throw new Error('Account not found');
    }
    // Ensure the account has sufficient balance for withdrawals
    if (transaction.type === 'withdraw' && account.balance < transaction.amount) {
        throw new Error('Insufficient funds');
    }
    // Calculate the new balance
    const newBalance = transaction.type === 'withdraw'
        ? account.balance - transaction.amount
        : account.balance + transaction.amount;
    // Update the account balance
    yield prisma.account.update({
        where: { id: transaction.accountId },
        data: { balance: newBalance },
    });
    // Create the transaction
    const newTransaction = yield prisma.transaction.create({
        data: {
            accountId: transaction.accountId,
            amount: transaction.amount,
            status: transaction.type,
        },
    });
    return newTransaction;
});
exports.processTransaction = processTransaction;
