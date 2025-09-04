import express from "express";
import { index, show, store, updateStatus, destroy } from '../controllers/purchasesController.js';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', updateStatus); // Aggiorna lo stato, non tutti i campi
router.delete('/:id', destroy);

export default router;