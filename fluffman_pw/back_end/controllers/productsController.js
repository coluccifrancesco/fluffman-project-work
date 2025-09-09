import pool from "../db/connection.js";
import { validateId, validatePrice, sanitizeAndValidateNumberField } from "../utils/validators.js";

// INDEX - Mostra tutti i prodotti
export async function index(req, res) {
    try {
        const [rows] = await pool.query(`
            SELECT
                p.*,
                i.name AS image_path
            FROM products AS p
            JOIN images AS i ON p.id = i.product_id
            ORDER BY p.id ASC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// SHOW - Mostra un singolo prodotto tramite ID
export async function show(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                b.name AS brand_name,
                i.name AS image_path
            FROM products AS p
            JOIN images AS i ON p.id = i.product_id
            JOIN brands AS b ON p.brand_id = b.id
            WHERE p.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato." });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// SEARCH - Cerca e filtra prodotti con il percorso immagine
export async function search(req, res) {
    const { name, brand_id, animal_id, price_min, price_max, sort_by, sort_order } = req.query;

    let query = `
        SELECT
            p.*,
            b.name AS brand_name,
            i.name AS image_path
        FROM products AS p
        JOIN images AS i ON p.id = i.product_id
        LEFT JOIN brands AS b ON p.brand_id = b.id
    `;
    const values = [];
    const conditions = [];

    // --- LOGICA DI FILTRAGGIO MANCANTE ---

    if (name) {
        conditions.push(`p.name LIKE ?`);
        values.push(`%${name}%`);
    }

    if (brand_id) {
        conditions.push(`p.brand_id = ?`);
        values.push(brand_id);
    }

    if (animal_id) {
        conditions.push(`p.animal_id = ?`);
        values.push(animal_id);
    }

    if (price_min) {
        conditions.push(`p.price >= ?`);
        values.push(price_min);
    }

    if (price_max) {
        conditions.push(`p.price <= ?`);
        values.push(price_max);
    }

    // --- FINE LOGICA DI FILTRAGGIO MANCANTE ---

    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(` AND `);
    }

    let order = 'p.id';
    let orderDirection = 'ASC';

    if (sort_by) {
        const allowedSorts = ['price', 'name'];
        if (allowedSorts.includes(sort_by)) {
            order = `p.${sort_by}`;
        }
    }

    if (sort_order && (sort_order.toUpperCase() === 'DESC' || sort_order.toUpperCase() === 'ASC')) {
        orderDirection = sort_order.toUpperCase();
    }

    query += ` ORDER BY ${order} ${orderDirection}`;

    try {
        const [rows] = await pool.query(query, values);
        res.json(rows);
    } catch (err) {
        console.error('Errore durante la ricerca:', err);
        res.status(500).json({ error: true, message: "Errore interno del server durante la ricerca." });
    }
}


// showBySlug - Mostra un singolo prodotto tramite slug
export async function showBySlug(req, res) {
    const { slug } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                b.name AS brand_name,
                i.name AS image_path
            FROM products AS p
            JOIN images AS i ON p.id = i.product_id
            LEFT JOIN brands AS b ON p.brand_id = b.id
            WHERE p.slug = ?
        `, [slug]);

        if (rows.length === 0) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato." });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// STORE - Crea un nuovo prodotto
export async function store(req, res) {
    const {
        animal_id, brand_id, name, description, quantity, price, discount_price, age, weight,
        accessories, food_type, biological, pet_food_necessity, hair, additional_information,
        product_weight, slug
    } = req.body;

    // Validazione e sanitizzazione dei campi
    const validatedQuantity = sanitizeAndValidateNumberField(quantity, 'quantity');
    if (validatedQuantity.error) {
        return res.status(400).json(validatedQuantity);
    }
    const validatedPrice = validatePrice(price, 'price');
    if (validatedPrice.error) {
        return res.status(400).json(validatedPrice);
    }

    try {
        const [rows] = await pool.query(
            "INSERT INTO products (animal_id, brand_id, name, description, quantity, price, discount_price, age, weight, accessories, food_type, biological, pet_food_necessity, hair, additional_information, product_weight, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [animal_id, brand_id, name, description, validatedQuantity, validatedPrice, discount_price, age, weight, accessories, food_type, biological, pet_food_necessity, hair, additional_information, product_weight, slug]
        );
        res.status(201).json({ id: rows.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

//Update solo prezzo
export async function changePrice(req, res) {
    const { id } = req.params;
    const { new_price } = req.body;

    try {
        await pool.query("UPDATE products SET price = ? WHERE id = ?", [new_price, id]);
        res.json({ message: "Prezzo aggiornato con successo." });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE - Aggiorna un prodotto esistente
export async function update(req, res) {
    const { id } = req.params;
    const {
        animal_id, brand_id, name, description, quantity, price, discount_price, age, weight,
        accessories, food_type, biological, pet_food_necessity, hair, additional_information,
        product_weight, slug
    } = req.body;

    // Validazione e sanitizzazione
    const validatedQuantity = sanitizeAndValidateNumberField(quantity, 'quantity');
    if (validatedQuantity.error) {
        return res.status(400).json(validatedQuantity);
    }
    const validatedPrice = validatePrice(price, 'price');
    if (validatedPrice.error) {
        return res.status(400).json(validatedPrice);
    }

    try {
        await pool.query(
            "UPDATE products SET animal_id = ?, brand_id = ?, name = ?, description = ?, quantity = ?, price = ?, discount_price = ?, age = ?, weight = ?, accessories = ?, food_type = ?, biological = ?, pet_food_necessity = ?, hair = ?, additional_information = ?, product_weight = ?, slug = ? WHERE id = ?",
            [animal_id, brand_id, name, description, validatedQuantity, validatedPrice, discount_price, age, weight, accessories, food_type, biological, pet_food_necessity, hair, additional_information, product_weight, slug, id]
        );

        const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// DESTROY - Elimina un prodotto
export async function destroy(req, res) {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM products WHERE id = ?", [id]);
        res.status(200).json({ message: "Prodotto eliminato con successo." });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}