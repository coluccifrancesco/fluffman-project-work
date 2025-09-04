// middlewares/NotFoundError.js
export default function notFoundError(req, res, next) {
    res.status(404).json({ error: true, message: "Risorsa non trovata" });
};