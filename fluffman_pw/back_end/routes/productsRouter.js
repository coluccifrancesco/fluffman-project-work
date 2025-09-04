// importo express
import express from "express";

// Importa i controller che abbiamo creato in precedenza
// Nota: ho aggiunto 'changePrice' all'import
import {
    index,
    store,
    update,
    destroy,
    changePrice
} from '../controllers/productsController.js';

//inizializzo il router
const router = express.Router();

// --- ROTTE CRUD BASE ---

// Rotta index
router.get('/', index);

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