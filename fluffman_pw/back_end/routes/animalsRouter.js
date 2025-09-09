// Importa Express e il suo modulo Router
import express from "express";

// Importa le funzioni del controller degli animali
import {
    index,
    show,
    showBySlug,
    store,
    update,
    destroy
} from '../controllers/animalsController.js';

// Inizializza il router
const router = express.Router();

// Rotta per ottenere tutti i tipi di animali
router.get('/', index);

// Rotta per ottenere un singolo tipo di animale per ID
router.get('/:id', show);

// Rotta per ottenere un singolo tipo di animale per slug
router.get('/:slug', showBySlug);

// Rotta per creare un nuovo tipo di animale
router.post('/', store);

// Rotta per aggiornare un tipo di animale esistente
router.put('/:id', update);

// Rotta per eliminare un tipo di animale
router.delete('/:id', destroy);

// Esporta il router per renderlo disponibile al file server.js
export default router;