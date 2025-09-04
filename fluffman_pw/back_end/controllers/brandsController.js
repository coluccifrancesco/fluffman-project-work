import pool from "../db/connection.js";

// INDEX
export async function index(req, res) {
    try {
        const { rows } = await pool.query("SELECT * FROM brands ORDER BY id ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// SHOW
export async function show(req, res) {
    const { id } = req.params;
    try {
        const { rows: [brand] } = await pool.query("SELECT * FROM brands WHERE id = $1", [id]);
        if (!brand) {
            return res.status(404).json({ error: true, message: "Marchio non trovato." });
        }
        res.json(brand);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// STORE
export async function store(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: true, message: "Il nome del marchio è obbligatorio." });
    }

    try {
        const { rows: [newBrand] } = await pool.query(
            "INSERT INTO brands (name) VALUES ($1) RETURNING *",
            [name.trim()]
        );
        res.status(201).json(newBrand);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE: aggiorna il nome del brand
export async function update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: true, message: "Il nome è obbligatorio." });
    }

    try {
        const { rows: [updatedBrand] } = await pool.query(
            "UPDATE brands SET name = $1 WHERE id = $2 RETURNING *",
            [name.trim(), id]
        );

        if (!updatedBrand) {
            return res.status(404).json({ error: true, message: "Marchio non trovato." });
        }

        res.status(200).json(updatedBrand);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// DESTROY
export async function destroy(req, res) {
    const { id } = req.params;
    const brandId = parseInt(id);

    if (isNaN(brandId)) {
        return res.status(400).json({ error: true, message: "ID non valido." });
    }

    try {
        const result = await pool.query("DELETE FROM brands WHERE id = $1", [brandId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: true, message: "Marchio non trovato." });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}