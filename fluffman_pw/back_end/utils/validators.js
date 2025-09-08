// utils/validators.js

/**
 * Valida un ID come numero intero positivo.
 * @param {*} value - Il valore da validare.
 * @param {string} fieldName - Il nome del campo per il messaggio di errore.
 * @returns {number|object} - Il valore numerico o un oggetto di errore.
 */
export const validateId = (value, fieldName) => {
    const numberValue = Number(value);
    if (isNaN(numberValue) || !Number.isInteger(numberValue) || numberValue <= 0) {
        return { error: true, message: `Il campo '${fieldName}' deve essere un numero intero positivo.` };
    }
    return numberValue;
};

/**
 * Valida un valore come prezzo, ovvero un numero non negativo.
 * @param {*} value - Il valore da validare.
 * @param {string} fieldName - Il nome del campo per il messaggio di errore.
 * @returns {number|object} - Il valore numerico o un oggetto di errore.
 */
export const validatePrice = (value, fieldName) => {
    const numberValue = Number(value);
    if (isNaN(numberValue) || numberValue < 0) {
        return { error: true, message: `Il campo '${fieldName}' deve essere un numero non negativo.` };
    }
    return numberValue;
};

/**
 * Sanifica e valida un campo numerico che potrebbe essere null.
 * Converte esplicitamente stringhe vuote, undefined o 'NULL' in un valore null.
 * Inoltre, verifica che il valore, se presente, sia un numero valido e positivo.
 * @param {*} value - Il valore da sanificare.
 * @param {boolean} isRequiredAndPositive - Se il campo deve essere obbligatorio e positivo.
 * @returns {number|null|object} - Il valore numerico, null o un oggetto di errore.
 */
export const sanitizeAndValidateNumberField = (value, isRequiredAndPositive = false) => {
    if (value === null || value === undefined || value === '' || (typeof value === 'string' && value.toUpperCase() === 'NULL')) {
        if (isRequiredAndPositive) {
            return { error: true, message: "Il campo 'quantity' deve essere un numero intero non negativo." };
        }
        return null;
    }

    const numberValue = Number(value);
    if (isNaN(numberValue)) {
        return { error: true, message: "Il campo 'quantity' deve essere un numero valido." };
    }

    if (isRequiredAndPositive && (!Number.isInteger(numberValue) || numberValue < 0)) {
        return { error: true, message: "Il campo 'quantity' deve essere un numero intero non negativo." };
    }

    return numberValue;
};