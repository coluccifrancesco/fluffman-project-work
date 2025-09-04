//importo express
import express from "express";

//importo cors
import cors from "cors";

//importo dotenv
import dotenv from "dotenv";

//importo le routes
import productsRouter from './routes/productsRouter.js';
import imagesRouter from './routes/imagesRouter.js';
import animalsRouter from './routes/animalsRouter.js';
import brandsRouter from './routes/brandsRouter.js';
import purchasesRouter from './routers/purchasesRouter.js';
import productPurchaseRouter from './routers/productPurchaseRouter.js';

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

// Tutte le rotte che iniziano con '/products' verranno gestite da productsRouter
app.use('/products', productsRouter);

// Tutte le rotte che iniziano con '/images' verranno gestite da imagesRouter
app.use('api/images', imagesRouter);

// Collega il router degli animali all'URL /api/animals
app.use('/api/animals', animalsRouter);

// Collega il router dei brands all'URL /api/brands
app.use('/api/brands', brandsRouter);

// Collega il router dei purchases all'URL /api/purchases
app.use('/api/purchases', purchasesRouter);

// Collega il router dei product_purchase all'URL /api/product_purchase
app.use('/api/product_purchase', productPurchaseRouter);

//rotta di base
app.get('/', (req, res) => { res.send('Welcome to our Pet shop') });

//uso middleware handleServerError
app.use(handleServerError);

//uso middleware notFoundError
app.use(notFoundError);

//server in ascolto
app.listen(PORT, () => { console.log(`Server is listening on http://127.0.0.1:${PORT}`) });