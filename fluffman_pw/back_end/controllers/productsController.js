import pool from "../db/connection.js";

// READ (index): Ottiene tutti i prodotti
export async function index(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM products ORDER BY id ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// CREATE (store): Crea un nuovo prodotto
export async function store(req, res) {
    const { name, description, price, animal_id, brand_id, food_type } = req.body;

    if (!name) {
        return res.status(400).json({ error: true, message: "Il nome del prodotto è obbligatorio." });
    }
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: true, message: "Il prezzo deve essere un numero valido e maggiore di zero." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const { rows: [newProduct] } = await pool.query(
            `INSERT INTO products (name, description, price, animal_id, brand_id, food_type)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [name.trim(), description ? description.trim() : null, price, animal_id || null, brand_id || null, food_type || null]
        );
        res.status(201).json(newProduct);
        */

        // Codice MySQL
        const query = `INSERT INTO products (name, description, price, animal_id, brand_id, food_type) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name.trim(), description ? description.trim() : null, price, animal_id || null, brand_id || null, food_type || null];
        const [result] = await pool.query(query, values);

        const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE: Aggiorna il prezzo
export async function changePrice(req, res) {
    const { id } = req.params;
    const { new_price } = req.body;

    if (typeof new_price !== 'number' || new_price <= 0) {
        return res.status(400).json({ error: true, message: "Il prezzo deve essere un numero valido." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const { rows: [updated] } = await pool.query(
            "UPDATE products SET price = $1 WHERE id = $2 RETURNING *",
            [new_price, id]
        );
        if (!updated) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }
        res.status(200).json({
            success: true,
            message: `Prezzo del prodotto ${id} aggiornato con successo`,
            updatedPrice: updated.price
        });
        */

        // Codice MySQL
        const [result] = await pool.query("UPDATE products SET price = ? WHERE id = ?", [new_price, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }

        const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
        res.status(200).json({
            success: true,
            message: `Prezzo del prodotto ${id} aggiornato con successo`,
            updatedPrice: rows[0].price
        });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE
export async function update(req, res) {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: true, message: "ID non valido" });
    }

    const { name, description, price, animal_id, brand_id, food_type } = req.body;

    if (!name || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: true, message: "Nome e prezzo sono obbligatori e validi." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const { rows: [product] } = await pool.query(
            `UPDATE products
             SET name = $1, description = $2, price = $3, animal_id = $4, brand_id = $5, food_type = $6
             WHERE id = $7
             RETURNING *`,
            [name.trim(), description ? description.trim() : null, price, animal_id || null, brand_id || null, food_type || null, id]
        );
        if (!product) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }
        res.json({ success: true, message: "Prodotto aggiornato con successo", product });
        */

        // Codice MySQL
        const query = `UPDATE products SET name = ?, description = ?, price = ?, animal_id = ?, brand_id = ?, food_type = ? WHERE id = ?`;
        const values = [name.trim(), description ? description.trim() : null, price, animal_id || null, brand_id || null, food_type || null, id];
        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }

        const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
        res.json({ success: true, message: "Prodotto aggiornato con successo", product: rows[0] });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// DESTROY
export async function destroy(req, res) {
    const { id } = req.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
        return res.status(400).json({ error: true, message: "ID non valido" });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const result = await pool.query("DELETE FROM products WHERE id = $1", [productId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }
        res.sendStatus(204);
        */

        // Codice MySQL
        const [result] = await pool.query("DELETE FROM products WHERE id = ?", [productId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}