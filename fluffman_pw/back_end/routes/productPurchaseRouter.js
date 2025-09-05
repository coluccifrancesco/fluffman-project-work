import express from "express";
import { index, show, store, update, destroy } from '../controllers/productPurchaseController.js';

const router = express.Router();

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update); //Aggiorna la quantità di un articolo in un acquisto
router.delete('/:id', destroy);

export default router;