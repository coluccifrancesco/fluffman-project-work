import express from "express";

import {
    index,
    show,
    store,
    update,
    destroy
} from '../controllers/brandsController.js';

const router = express.Router();

// Rotta per ottenere tutti i marchi
router.get('/', index);

// Rotta per ottenere un singolo marchio per ID
router.get('/:id', show);

// Rotta per creare un nuovo marchio
router.post('/', store);

// Rotta per aggiornare un marchio esistente
router.put('/:id', update);

// Rotta per eliminare un marchio
router.delete('/:id', destroy);

export default router;