// Importo express
import express from "express";

// Importa i controller che abbiamo creato
import {
    index,
    show,
    getRelatedProducts,
    store,
    update,
    destroy,
    showBySlug,
    search
} from '../controllers/productsController.js';

// Inizializzo il router
const router = express.Router();

// --- ROTTE SPECIFICHE (Vanno messe prima di quelle generiche) ---

// Rotta per la ricerca e il filtro
router.get('/search', search);

// Rotta per cercare un prodotto usando il suo slug.
// Questa rotta DEVE venire PRIMA delle altre GET con parametri.
router.get('/:slug', showBySlug);

// Rotta show (cerca per ID)
// Abbiamo reso il percorso più specifico per evitare conflitti con lo slug
router.get('/id/:id', show);


// Rotta related (cerca per ID)
router.get('/:id/related', getRelatedProducts);

// --- ROTTE CRUD BASE ---

// Rotta index (non ha parametri, va bene così)
router.get('/', index);

// Rotta store
router.post('/', store);

// Rotta update (gestisce tutte le modifiche, anche del prezzo)
router.put('/:id', update);

// Rotta destroy
router.delete('/:id', destroy);

export default router;