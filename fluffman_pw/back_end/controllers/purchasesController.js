import pool from "../db/connection.js";

// STORE
export async function store(req, res) {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ error: true, message: "ID utente obbligatorio." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const status = 'pending';
        const { rows: [newPurchase] } = await pool.query(
            `INSERT INTO purchases (user_id, status) VALUES ($1, $2) RETURNING *`,
            [user_id, status]
        );
        res.status(201).json(newPurchase);
        */

        // Codice MySQL
        const status = 'pending';
        const query = `INSERT INTO purchases (user_id, status) VALUES (?, ?)`;
        const values = [user_id, status];
        const [result] = await pool.query(query, values);

        const [rows] = await pool.query("SELECT * FROM purchases WHERE id = ?", [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// INDEX
export async function index(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM purchases ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// SHOW
export async function show(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM purchases WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "Acquisto non trovato." });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE STATUS
export async function updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: true, message: "Stato non specificato." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const { rows: [updated] } = await pool.query(
            "UPDATE purchases SET status = $1 WHERE id = $2 RETURNING *",
            [status, id]
        );
        if (!updated) {
            return res.status(404).json({ error: true, message: "Acquisto non trovato." });
        }
        res.json(updated);
        */

        // Codice MySQL
        const [result] = await pool.query("UPDATE purchases SET status = ? WHERE id = ?", [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Acquisto non trovato." });
        }
        const [rows] = await pool.query("SELECT * FROM purchases WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// DELETE (destroy): Elimina un acquisto
export async function destroy(req, res) {
    const { id } = req.params;
    try {
        /* Codice Supabase (PostgreSQL)
        const result = await pool.query("DELETE FROM purchases WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: true, message: "Acquisto non trovato." });
        }
        res.sendStatus(204);
        */

        // Codice MySQL
        const [result] = await pool.query("DELETE FROM purchases WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Acquisto non trovato." });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}