//import express
import express from "express";

//import cors
import cors from "cors";

//import dotenv
import dotenv from "dotenv";

// FIXME: import router

//caricare le variabili da .env
dotenv.config();

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

//server is listening
app.listen(PORT, () => { console.log(`Server is listening on http://127.0.0.1:${PORT}`) });