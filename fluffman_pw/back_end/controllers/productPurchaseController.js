import pool from "../db/connection.js";

// STORE
export async function store(req, res) {
    const { product_id, purchase_id, quantity, price } = req.body;
    if (!product_id || !purchase_id || !quantity || !price) {
        return res.status(400).json({ error: true, message: "Dati mancanti." });
    }

    try {
        const { rows: [newItem] } = await pool.query(
            `INSERT INTO product_purchase (product_id, purchase_id, quantity, price)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [product_id, purchase_id, quantity, price]
        );
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// INDEX
export async function index(req, res) {
    try {
        const { rows } = await pool.query("SELECT * FROM product_purchase ORDER BY id ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// SHOW
export async function show(req, res) {
    const { id } = req.params;
    try {
        const { rows: [item] } = await pool.query("SELECT * FROM product_purchase WHERE id = $1", [id]);
        if (!item) {
            return res.status(404).json({ error: true, message: "Articolo acquisto non trovato." });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE Aggiorna la quantità di un articolo in un acquisto
export async function update(req, res) {
    const { id } = req.params;
    const { quantity, price } = req.body; // Puoi aggiornare anche il prezzo

    try {
        const { rows: [updatedItem] } = await pool.query(
            "UPDATE product_purchase SET quantity = $1, price = $2 WHERE id = $3 RETURNING *",
            [quantity, price, id]
        );
        if (!updatedItem) {
            return res.status(404).json({ error: true, message: "Articolo acquisto non trovato." });
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// DESTROY
export async function destroy(req, res) {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM product_purchase WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: true, message: "Articolo acquisto non trovato." });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}