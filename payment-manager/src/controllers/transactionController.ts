import { Request, Response } from 'express';
import { processTransaction } from '../services/transactionService';

export const sendTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = req.body;
    const result = await processTransaction({ ...transaction, type: 'send' });
    res.json(result);
  } catch (error) {
    const err = error as Error; 
    res.status(500).json({ error: err.message });
  }
};

export const withdrawTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = req.body;
    const result = await processTransaction({ ...transaction, type: 'withdraw' });
    res.json(result);
  } catch (error) {
    const err = error as Error; 
    res.status(500).json({ error: err.message });
  }
};
