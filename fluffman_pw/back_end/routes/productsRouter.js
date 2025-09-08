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
    showBySlug // <-- La funzione per cercare per slug
} from '../controllers/productsController.js';

//inizializzo il router
const router = express.Router();

// --- ROTTE CRUD BASE ---

// Rotta per cercare un prodotto usando il suo slug.
// Questa rotta DEVE venire PRIMA di quella per l'ID per evitare conflitti.
router.get('/:slug', showBySlug);

// Rotta index
router.get('/', index);

// Rotta show (cerca per ID)
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