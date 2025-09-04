import pool from "../db/connection.js";

// INDEX
export async function index(req, res) {
    try {
        const { rows } = await pool.query("SELECT * FROM animals ORDER BY id ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// SHOW: Ottiene un singolo tipo di animale per ID
export async function show(req, res) {
    const { id } = req.params;
    try {
        const { rows: [animal] } = await pool.query("SELECT * FROM animals WHERE id = $1", [id]);
        if (!animal) {
            return res.status(404).json({ error: true, message: "Tipo di animale non trovato." });
        }
        res.json(animal);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// STORE
export async function store(req, res) {
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({ error: true, message: "Il tipo è obbligatorio." });
    }

    try {
        const { rows: [newAnimal] } = await pool.query(
            "INSERT INTO animals (type) VALUES ($1) RETURNING *",
            [type.trim()]
        );
        res.status(201).json(newAnimal);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE: Aggiorna il nome di un tipo di animale
export async function update(req, res) {
    const { id } = req.params;
    const { type } = req.body;

    if (!type) {
        return res.status(400).json({ error: true, message: "Il tipo è obbligatorio." });
    }

    try {
        const { rows: [updatedAnimal] } = await pool.query(
            "UPDATE animals SET type = $1 WHERE id = $2 RETURNING *",
            [type.trim(), id]
        );

        if (!updatedAnimal) {
            return res.status(404).json({ error: true, message: "Tipo di animale non trovato." });
        }

        res.status(200).json(updatedAnimal);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// DESTROY: Elimina un tipo di animale
export async function destroy(req, res) {
    const { id } = req.params;
    const animalId = parseInt(id);

    if (isNaN(animalId)) {
        return res.status(400).json({ error: true, message: "ID non valido." });
    }

    try {
        const result = await pool.query("DELETE FROM animals WHERE id = $1", [animalId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: true, message: "Tipo di animale non trovato." });
        }

        res.sendStatus(204);
    } catch (err) {
        // Se un tipo di animale è associato a un prodotto, il database impedirà la cancellazione (errore di foreign key)
        res.status(500).json({ error: true, message: err.message });
    }
}