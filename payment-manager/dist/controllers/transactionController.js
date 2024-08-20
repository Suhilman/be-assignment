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
exports.withdrawTransaction = exports.sendTransaction = void 0;
const transactionService_1 = require("../services/transactionService");
const sendTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = req.body;
        const result = yield (0, transactionService_1.processTransaction)(Object.assign(Object.assign({}, transaction), { type: 'send' }));
        res.json(result);
    }
    catch (error) {
        const err = error; // Type assertion to treat error as an instance of Error
        res.status(500).json({ error: err.message });
    }
});
exports.sendTransaction = sendTransaction;
const withdrawTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = req.body;
        const result = yield (0, transactionService_1.processTransaction)(Object.assign(Object.assign({}, transaction), { type: 'withdraw' }));
        res.json(result);
    }
    catch (error) {
        const err = error; // Type assertion to treat error as an instance of Error
        res.status(500).json({ error: err.message });
    }
});
exports.withdrawTransaction = withdrawTransaction;
