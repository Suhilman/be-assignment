"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
const router = (0, express_1.Router)();
router.post('/send', transactionController_1.sendTransaction);
router.post('/withdraw', transactionController_1.withdrawTransaction);
exports.default = router;
