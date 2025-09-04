import pool from "../db/connection.js";

// INDEX
export async function index(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM images ORDER BY id ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// SHOW
export async function show(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM images WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "Immagine non trovata." });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// STORE
export async function store(req, res) {
    const { url, product_id } = req.body;

    if (!url || !product_id) {
        return res.status(400).json({ error: true, message: "URL dell'immagine e ID del prodotto sono obbligatori." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const { rows: [newImage] } = await pool.query(
            "INSERT INTO images (url, product_id) VALUES ($1, $2) RETURNING *",
            [url, product_id]
        );
        res.status(201).json(newImage);
        */

        // Codice MySQL
        const [result] = await pool.query("INSERT INTO images (url, product_id) VALUES (?, ?)", [url, product_id]);

        const [rows] = await pool.query("SELECT * FROM images WHERE id = ?", [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE
export async function update(req, res) {
    const { id } = req.params;
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: true, message: "Il nuovo URL è obbligatorio." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const { rows: [updatedImage] } = await pool.query(
            "UPDATE images SET url = $1 WHERE id = $2 RETURNING *",
            [url, id]
        );
        if (!updatedImage) {
            return res.status(404).json({ error: true, message: "Immagine non trovata." });
        }
        res.status(200).json(updatedImage);
        */

        // Codice MySQL
        const [result] = await pool.query("UPDATE images SET url = ? WHERE id = ?", [url, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Immagine non trovata." });
        }

        const [rows] = await pool.query("SELECT * FROM images WHERE id = ?", [id]);
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// DESTROY
export async function destroy(req, res) {
    const { id } = req.params;
    const imageId = parseInt(id);

    if (isNaN(imageId)) {
        return res.status(400).json({ error: true, message: "ID non valido." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const result = await pool.query("DELETE FROM images WHERE id = $1", [imageId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: true, message: "Immagine non trovata." });
        }
        res.sendStatus(204);
        */

        // Codice MySQL
        const [result] = await pool.query("DELETE FROM images WHERE id = ?", [imageId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Immagine non trovata." });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}