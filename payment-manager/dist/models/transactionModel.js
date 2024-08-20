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
exports.TransactionModel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TransactionModel {
    static createTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountId, amount, status } = data;
            // Find the related account
            const account = yield prisma.account.findUnique({
                where: { id: accountId },
            });
            if (!account) {
                throw new Error('Account not found');
            }
            // Check if the transaction is a withdrawal and if the account has sufficient funds
            if (status === 'withdraw' && account.balance < amount) {
                throw new Error('Insufficient funds');
            }
            // Update account balance
            const newBalance = status === 'withdraw' ? account.balance - amount : account.balance + amount;
            yield prisma.account.update({
                where: { id: accountId },
                data: { balance: newBalance },
            });
            // Create the transaction
            const transaction = yield prisma.transaction.create({
                data: {
                    accountId,
                    amount,
                    status,
                },
            });
            return transaction;
        });
    }
    static getTransactionsByAccountId(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.transaction.findMany({
                where: { accountId },
                orderBy: {
                    timestamp: 'desc',
                },
            });
        });
    }
    static getTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.transaction.findUnique({
                where: { id },
            });
        });
    }
}
exports.TransactionModel = TransactionModel;
