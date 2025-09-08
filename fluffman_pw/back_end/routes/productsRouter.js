// importo express
import express from "express";

// Importa i controller che abbiamo creato in precedenza
import {
    index,
    show,
    store,
    update,
    destroy,
    changePrice,
    showBySlug,
    search // <-- Importa la funzione di ricerca
} from '../controllers/productsController.js';

//inizializzo il router
const router = express.Router();

// --- ROTTE SPECIFICHE ---

// Rotta per la ricerca e il filtro (la più specifica)
router.get('/search', search);

// Rotta per aggiornare solo il prezzo (PATCH)
router.patch('/:id/price', changePrice);

// Rotta per cercare un prodotto usando il suo slug.
// Questa rotta DEVE venire PRIMA di quella per l'ID per evitare conflitti.
router.get('/:slug', showBySlug);

// --- ROTTE CRUD BASE ---

// Rotta index (non ha parametri, va bene così)
router.get('/', index);

// Rotta show (cerca per ID)
router.get('/:id', show);

// Rotta store (non ha parametri, va bene così)
router.post('/', store);

// Rotta update
router.put('/:id', update);

// Rotta destroy
router.delete('/:id', destroy);

export default router;