import pool from "../db/connection.js";

/**
 * Sanifica un campo numerico che potrebbe essere null.
 * Converte esplicitamente le stringhe vuote, undefined o 'NULL' in un vero valore null.
 * @param {*} value - Il valore da sanificare.
 * @returns {number|null} - Il valore numerico o null se non valido.
 */
const sanitizeNullableNumberField = (value) => {
    if (value === null || value === undefined || value === '' || (typeof value === 'string' && value.toUpperCase() === 'NULL')) {
        return null;
    }
    return value;
};

// La funzione INDEX del tuo controller dei prodotti
export async function index(req, res) {
    try {
        // Usiamo una JOIN per unire le due tabelle
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                i.name AS image_name
            FROM products AS p
            JOIN images AS i ON p.id = i.product_id
            ORDER BY p.id ASC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

//SHOW
export async function show(req, res) {
    const { id } = req.params;
    try {
        // JOIN con la tabella images per ottenere il nome dell'immagine
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                i.name AS image_name
            FROM products AS p
            JOIN images AS i ON p.id = i.product_id
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

// CREATE (store): Crea un nuovo prodotto
export async function store(req, res) {
    const {
        name, description, quantity, price, discount_price, age, weight,
        accessories, food_type, biological, pet_food_necessity, hair,
        additional_information, product_weight, animal_id, brand_id
    } = req.body;

    if (!name) {
        return res.status(400).json({ error: true, message: "Il nome del prodotto è obbligatorio." });
    }
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: true, message: "Il prezzo deve essere un numero valido e maggiore di zero." });
    }

    try {
        // Applica la sanificazione prima di creare la query
        const finalQuantity = sanitizeNullableNumberField(quantity);
        const finalDiscountPrice = sanitizeNullableNumberField(discount_price);
        const finalProductWeight = sanitizeNullableNumberField(product_weight);

        /* Codice PostgreSQL (commentato)
        const { rows: [newProduct] } = await pool.query(
            `INSERT INTO products (
                name, description, quantity, price, discount_price, age, weight, 
                accessories, food_type, biological, pet_food_necessity, hair, 
                additional_information, product_weight, animal_id, brand_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
             RETURNING *`,
            [name.trim(), description ? description.trim() : null, finalQuantity, price, finalDiscountPrice, age || null, weight || null, accessories || 0, food_type || null, biological || 0, pet_food_necessity || null, hair || null, additional_information || null, finalProductWeight, animal_id || null, brand_id || null]
        );
        res.status(201).json(newProduct);
        */

        // Codice MySQL
        const query = `INSERT INTO products (
            name, description, quantity, price, discount_price, age, weight, 
            accessories, food_type, biological, pet_food_necessity, hair, 
            additional_information, product_weight, animal_id, brand_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            name.trim(),
            description ? description.trim() : null,
            finalQuantity,
            price,
            finalDiscountPrice,
            age || null,
            weight || null,
            accessories || 0,
            food_type || null,
            biological || 0,
            pet_food_necessity || null,
            hair || null,
            additional_information || null,
            finalProductWeight,
            animal_id || null,
            brand_id || null
        ];

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

    const {
        name, description, quantity, price, discount_price, age, weight,
        accessories, food_type, biological, pet_food_necessity, hair,
        additional_information, product_weight, animal_id, brand_id
    } = req.body;

    if (!name || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: true, message: "Nome e prezzo sono obbligatori e validi." });
    }

    try {
        // Applica la sanificazione anche qui
        const finalQuantity = sanitizeNullableNumberField(quantity);
        const finalDiscountPrice = sanitizeNullableNumberField(discount_price);
        const finalProductWeight = sanitizeNullableNumberField(product_weight);

        /* Codice PostgreSQL (commentato)
        const { rows: [product] } = await pool.query(
            `UPDATE products SET 
                name = $1, description = $2, quantity = $3, price = $4, discount_price = $5, age = $6, weight = $7, 
                accessories = $8, food_type = $9, biological = $10, pet_food_necessity = $11, hair = $12, 
                additional_information = $13, product_weight = $14, animal_id = $15, brand_id = $16
                WHERE id = $17
                RETURNING *`,
            [name.trim(), description ? description.trim() : null, finalQuantity, price, finalDiscountPrice, age || null, weight || null, accessories || 0, food_type || null, biological || 0, pet_food_necessity || null, hair || null, additional_information || null, finalProductWeight, animal_id || null, brand_id || null, id]
        );
        if (!product) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }
        res.json({ success: true, message: "Prodotto aggiornato con successo", product });
        */

        // Codice MySQL
        const query = `UPDATE products SET 
            name = ?, description = ?, quantity = ?, price = ?, discount_price = ?, age = ?, weight = ?, 
            accessories = ?, food_type = ?, biological = ?, pet_food_necessity = ?, hair = ?, 
            additional_information = ?, product_weight = ?, animal_id = ?, brand_id = ?
            WHERE id = ?`;
        const values = [
            name.trim(),
            description ? description.trim() : null,
            finalQuantity,
            price,
            finalDiscountPrice,
            age || null,
            weight || null,
            accessories || 0,
            food_type || null,
            biological || 0,
            pet_food_necessity || null,
            hair || null,
            additional_information || null,
            finalProductWeight,
            animal_id || null,
            brand_id || null,
            id
        ];
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
        const [result] = await pool.query("DELETE FROM products WHERE id = ?", [productId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}