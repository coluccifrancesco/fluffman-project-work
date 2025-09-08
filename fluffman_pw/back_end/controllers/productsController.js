import pool from "../db/connection.js";
import { validateId, validatePrice, sanitizeAndValidateNumberField } from "../utils/validators.js";

//INDEX
export async function index(req, res) {
    try {
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

// SHOW
export async function show(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                i.name AS image_name,
                b.name AS brand_name
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

// showBySlug
export async function showBySlug(req, res) {
    const { slug } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.*,
                i.name AS image_name,
                b.name AS brand_name
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

// CREATE (store): Crea un nuovo prodotto
export async function store(req, res) {
    const {
        name, description, quantity, price, discount_price, age, weight,
        accessories, food_type, biological, pet_food_necessity, hair,
        additional_information, product_weight, animal_id, brand_id
    } = req.body;

    if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: true, message: "Il nome del prodotto è obbligatorio e non può essere vuoto." });
    }

    const finalPrice = Number(price);
    if (isNaN(finalPrice) || finalPrice <= 0) {
        return res.status(400).json({ error: true, message: "Il prezzo deve essere un numero valido e maggiore di zero." });
    }

    const finalQuantity = sanitizeAndValidateNumberField(quantity, true);
    if (finalQuantity && finalQuantity.error) {
        return res.status(400).json(finalQuantity);
    }

    try {
        const finalDiscountPrice = sanitizeAndValidateNumberField(discount_price);
        const finalProductWeight = sanitizeAndValidateNumberField(product_weight);

        const query = `INSERT INTO products (
            name, description, quantity, price, discount_price, age, weight, 
            accessories, food_type, biological, pet_food_necessity, hair, 
            additional_information, product_weight, animal_id, brand_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            name.trim(),
            description ? description.trim() : null,
            finalQuantity,
            finalPrice,
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

// SEARCH: Cerca e filtra prodotti
export async function search(req, res) {
    const { name, brand_id, animal_id, price_min, price_max, sort_by, sort_order } = req.query;

    let query = `
        SELECT
            p.*,
            i.name AS image_name,
            b.name AS brand_name
        FROM products AS p
        JOIN images AS i ON p.id = i.product_id
        LEFT JOIN brands AS b ON p.brand_id = b.id
    `;
    const values = [];
    const conditions = [];

    // Validazione e filtro per ID brand
    if (brand_id) {
        const validatedBrandId = validateId(brand_id, 'brand_id');
        if (validatedBrandId.error) {
            return res.status(400).json(validatedBrandId);
        }
        conditions.push(`p.brand_id = ?`);
        values.push(validatedBrandId);
    }

    // Validazione e filtro per ID animale
    if (animal_id) {
        const validatedAnimalId = validateId(animal_id, 'animal_id');
        if (validatedAnimalId.error) {
            return res.status(400).json(validatedAnimalId);
        }
        conditions.push(`p.animal_id = ?`);
        values.push(validatedAnimalId);
    }

    // Validazione e filtro per prezzo minimo
    if (price_min) {
        const validatedPriceMin = validatePrice(price_min, 'price_min');
        if (validatedPriceMin.error) {
            return res.status(400).json(validatedPriceMin);
        }
        conditions.push(`p.price >= ?`);
        values.push(validatedPriceMin);
    }

    // Validazione e filtro per prezzo massimo
    if (price_max) {
        const validatedPriceMax = validatePrice(price_max, 'price_max');
        if (validatedPriceMax.error) {
            return res.status(400).json(validatedPriceMax);
        }
        conditions.push(`p.price <= ?`);
        values.push(validatedPriceMax);
    }

    // Filtro per ricerca testuale (name)
    if (name) {
        conditions.push(`p.name LIKE ? OR p.description LIKE ?`);
        values.push(`%${name}%`, `%${name}%`);
    }

    // Aggiunge la clausola WHERE solo se ci sono condizioni
    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(` AND `);
    }

    // Logica di ordinamento (sort_by, sort_order)
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

// UPDATE: Aggiorna il prezzo
export async function changePrice(req, res) {
    const { id } = req.params;
    const { new_price } = req.body;

    const finalNewPrice = Number(new_price);
    if (isNaN(finalNewPrice) || finalNewPrice <= 0) {
        return res.status(400).json({ error: true, message: "Il prezzo deve essere un numero valido e maggiore di zero." });
    }

    try {
        const [result] = await pool.query("UPDATE products SET price = ? WHERE id = ?", [finalNewPrice, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: true, message: "Prodotto non trovato" });
        }

        const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
        res.status(200).json({
            success: true,
            message: `Prezzo del prodotto ${id} aggiornato con successo`,
            updatedProduct: rows[0]
        });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
}

// UPDATE
export async function update(req, res) {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: true, message: "ID del prodotto non valido." });
    }

    const {
        name, description, quantity, price, discount_price, age, weight,
        accessories, food_type, biological, pet_food_necessity, hair,
        additional_information, product_weight, animal_id, brand_id
    } = req.body;

    if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: true, message: "Il nome del prodotto è obbligatorio e non può essere vuoto." });
    }

    const finalPrice = Number(price);
    if (isNaN(finalPrice) || finalPrice <= 0) {
        return res.status(400).json({ error: true, message: "Il prezzo deve essere un numero valido e maggiore di zero." });
    }

    const finalQuantity = sanitizeAndValidateNumberField(quantity, true);
    if (finalQuantity && finalQuantity.error) {
        return res.status(400).json(finalQuantity);
    }

    try {
        const finalDiscountPrice = sanitizeAndValidateNumberField(discount_price);
        const finalProductWeight = sanitizeAndValidateNumberField(product_weight);

        const query = `UPDATE products SET 
            name = ?, description = ?, quantity = ?, price = ?, discount_price = ?, age = ?, weight = ?, 
            accessories = ?, food_type = ?, biological = ?, pet_food_necessity = ?, hair = ?, 
            additional_information = ?, product_weight = ?, animal_id = ?, brand_id = ?
            WHERE id = ?`;
        const values = [
            name.trim(),
            description ? description.trim() : null,
            finalQuantity,
            finalPrice,
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