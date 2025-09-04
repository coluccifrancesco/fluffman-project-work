import express from 'express';
import { index, show, store, update, destroy } from '../controllers/imagesController.js';

const router = express.Router();

router.get('/', index); // Ottiene tutte le immagini
router.get('/:id', show); // Ottiene una singola immagine per ID
router.post('/', store); // Crea una nuova immagine
router.put('/:id', update); // Aggiorna un'immagine
router.delete('/:id', destroy); // Elimina un'immagine

export default router;