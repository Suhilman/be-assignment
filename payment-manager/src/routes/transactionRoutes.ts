import { Router } from 'express';
import { sendTransaction, withdrawTransaction } from '../controllers/transactionController';

const router = Router();

router.post('/send', sendTransaction);
router.post('/withdraw', withdrawTransaction);

export default router;
