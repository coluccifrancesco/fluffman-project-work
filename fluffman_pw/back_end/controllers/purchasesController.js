import pool from "../db/connection.js";

// STORE
export async function store(req, res) {
    const {
        user_id, date, card_number, total_price, name, last_name, email,
        phone_number, address, state, cap, shipping, invoice, status, shipping_invoice
    } = req.body;

    const productsInCart = req.body.products; // Array di oggetti: [{ id: 1, quantity: 2 }, { id: 5, quantity: 1 }]

    if (!user_id || !productsInCart || productsInCart.length === 0) {
        return res.status(400).json({ error: true, message: "Mancano campi obbligatori o il carrello è vuoto." });
    }

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        for (const item of productsInCart) {
            const [productRows] = await connection.query(
                "SELECT quantity FROM products WHERE id = ? FOR UPDATE",
                [item.id]
            );

            if (productRows.length === 0) {
                await connection.rollback();
                return res.status(404).json({ error: true, message: `Prodotto con ID ${item.id} non trovato.` });
            }

            const available = productRows[0].quantity;

            if (available < item.quantity) {
                await connection.rollback();
                return res.status(409).json({ error: true, message: `La quantità richiesta per il prodotto con ID ${item.id} non è disponibile.` });
            }

            await connection.query(
                "UPDATE products SET quantity = quantity - ? WHERE id = ?",
                [item.quantity, item.id]
            );
        }

        const [purchaseResult] = await connection.query(
            "INSERT INTO purchases (user_id, date, card_number, total_price, name, last_name, email, phone_number, address, state, cap, shipping, invoice, status, shipping_invoice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [user_id, date, card_number, total_price, name, last_name, email, phone_number, address, state, cap, shipping, invoice, status, shipping_invoice]
        );

        const purchaseId = purchaseResult.insertId;

        for (const item of productsInCart) {
            await connection.query(
                "INSERT INTO product_purchase (purchase_id, product_id, quantity) VALUES (?, ?, ?)",
                [purchaseId, item.id, item.quantity]
            );
        }

        await connection.commit();

        const [rows] = await pool.query("SELECT * FROM purchases WHERE id = ?", [purchaseId]);
        res.status(201).json(rows[0]);

    } catch (err) {
        if (connection) {
            await connection.rollback();
        }
        res.status(500).json({ error: true, message: err.message });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

// INDEX
export async function index(req, res) {
    try {
        // Ho cambiato l'ordinamento in base alla nuova colonna 'date'.
        const [rows] = await pool.query("SELECT * FROM purchases ORDER BY date DESC");
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