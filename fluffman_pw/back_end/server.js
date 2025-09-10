import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

// Correggi l'errore `__dirname is not defined`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//importo le routes
import productsRouter from './routes/productsRouter.js';
import imagesRouter from './routes/imagesRouter.js';
import animalsRouter from './routes/animalsRouter.js';
import brandsRouter from './routes/brandsRouter.js';
import purchasesRouter from './routes/purchasesRouter.js';
import productPurchaseRouter from './routes/productPurchaseRouter.js';
import cartRouter from "./routes/cartRouter.js";
import emailRouter from "./routes/emailRouter.js";

//caricare le variabili da .env
dotenv.config();

//middleware handleServerError
import handleServerError from "./middlewares/handleServerError.js";

//middleware notFoundError
import notFoundError from "./middlewares/notFoundError.js";

//funzione express
const app = express();

//definiamo la porta
const PORT = process.env.PORT || 3030;

//Bodyparser
app.use(express.json());

//facciamo si che le cors ci permettano di vedere il sito
app.use(cors());

// Aggiungi questa riga per servire i file statici correttamente.
// Mappa il percorso dell'URL '/api/images' alla cartella fisica 'public/products_image'.
app.use('/api/images', express.static(path.join(__dirname, 'public/products_image')));


// Tutte le rotte che iniziano con '/products' verranno gestite da productsRouter
app.use('/api/products', productsRouter);

// Tutte le rotte che iniziano con '/images' verranno gestite da imagesRouter
app.use('/api/images', imagesRouter);

// Collega il router degli animali all'URL /api/animals
app.use('/api/animals', animalsRouter);

// Collega il router dei brands all'URL /api/brands
app.use('/api/brands', brandsRouter);

// Collega il router dei purchases all'URL /api/purchases
app.use('/api/purchases', purchasesRouter);

// Collega il router dei product_purchase all'URL /api/product_purchase
app.use('/api/product_purchase', productPurchaseRouter);
// Collega il nuovo router
app.use('/api/cart', cartRouter);
// Collega il router per l'invio delle email
app.use('/api/send-email', emailRouter);

//rotta di base
app.get('/', (req, res) => { res.send('Welcome to our Pet shop') });

//uso middleware handleServerError
app.use(handleServerError);

//uso middleware notFoundError
app.use(notFoundError);

//server in ascolto
app.listen(PORT, () => { console.log(`Server is listening on http://127.0.0.1:${PORT}`) });