// importo express
import express from "express";

// Importa i controller che abbiamo creato in precedenza
// Nota: ho aggiunto 'showBySlug'
import {
    index,
    show,
    store,
    update,
    destroy,
    changePrice,
    showBySlug // <-- NUOVO: La funzione per cercare per slug
} from '../controllers/productsController.js';

//inizializzo il router
const router = express.Router();

// --- ROTTE CRUD BASE ---

// NUOVO: Rotta per cercare un prodotto usando il suo slug
// Questa rotta DEVE venire prima di router.get('/:id', show);
router.get('/slug/:slug', showBySlug);

// Rotta index
router.get('/', index);

// Rotta index (cerca per ID)
router.get('/:id', show);

// Rotta store
router.post('/', store);

// Rotta update
router.put('/:id', update);

// Rotta destroy
router.delete('/:id', destroy);

// --- ROTTA SPECIFICA ---

// Rotta per aggiornare solo il prezzo di un prodotto (UPDATE)
// Usiamo PATCH perché stiamo modificando solo un campo specifico.
router.patch('/:id/price', changePrice);

export default router;