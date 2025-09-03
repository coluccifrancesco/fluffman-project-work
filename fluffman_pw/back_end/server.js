//importo express
import express from "express";

//importo cors
import cors from "cors";

//importo dotenv
import dotenv from "dotenv";

// FIXME: import router

//caricare le variabili da .env
dotenv.config();

//middleware handleServerError
import handleServerError from "./middlewares/handleServerError";

//middleware notFoundError
import notFoundError from "./middlewares/notFoundError";

//funzione express
const app = express();

//definiamo la porta
const PORT = process.env.PORT || 3030;

//Bodyparser
app.use(express.json());

//facciamo si che le cors ci permettano di vedere il sito
app.use(cors());

//rottte API
app.use('/api/products', router);

//rotta di base
app.get('/', (req, res) => { res.send('Welcome to our Pet shop') });

//uso middleware handleServerError
app.use(handleServerError);

//uso middleware notFoundError
app.use(notFoundError);

//server in ascolto
app.listen(PORT, () => { console.log(`Server is listening on http://127.0.0.1:${PORT}`) });