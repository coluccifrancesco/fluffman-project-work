import pool from "../db/connection.js";

// INDEX
export async function index(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM animals ORDER BY id ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// SHOW
export async function show(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM animals WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "Tipo di animale non trovato." });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// STORE
export async function store(req, res) {
    const { animal_type } = req.body;

    if (!animal_type) {
        return res.status(400).json({ error: true, message: "Il tipo è obbligatorio." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const { rows: [newAnimal] } = await pool.query(
            "INSERT INTO animals (animal_type) VALUES ($1) RETURNING *",
            [animal_type.trim()]
        );
        res.status(201).json(newAnimal);
        */

        // Codice MySQL
        const [result] = await pool.query("INSERT INTO animals (animal_type) VALUES (?)", [animal_type.trim()]);

        const [rows] = await pool.query("SELECT * FROM animals WHERE id = ?", [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE
export async function update(req, res) {
    const { id } = req.params;
    const { animal_type } = req.body;

    if (!animal_type) {
        return res.status(400).json({ error: true, message: "Il tipo è obbligatorio." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const { rows: [updatedAnimal] } = await pool.query(
            "UPDATE animals SET animal_type = $1 WHERE id = $2 RETURNING *",
            [animal_type.trim(), id]
        );
        if (!updatedAnimal) {
            return res.status(404).json({ error: true, message: "Tipo di animale non trovato." });
        }
        res.status(200).json(updatedAnimal);
        */

        // Codice MySQL
        const [result] = await pool.query("UPDATE animals SET animal_type = ? WHERE id = ?", [animal_type.trim(), id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Tipo di animale non trovato." });
        }

        const [rows] = await pool.query("SELECT * FROM animals WHERE id = ?", [id]);
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// DESTROY
export async function destroy(req, res) {
    const { id } = req.params;
    const animalId = parseInt(id);

    if (isNaN(animalId)) {
        return res.status(400).json({ error: true, message: "ID non valido." });
    }

    try {
        /* Codice Supabase (PostgreSQL)
        const result = await pool.query("DELETE FROM animals WHERE id = $1", [animalId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: true, message: "Tipo di animale non trovato." });
        }
        res.sendStatus(204);
        */

        // Codice MySQL
        const [result] = await pool.query("DELETE FROM animals WHERE id = ?", [animalId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Tipo di animale non trovato." });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}