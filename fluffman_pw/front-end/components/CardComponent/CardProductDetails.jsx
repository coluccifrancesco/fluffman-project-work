import { useEffect, useState } from "react";

// Questa funzione è all'interno di un altro file, ma per chiarezza la riporto qui.
// Assicurati che il tuo codice React la chiami in modo corretto.
function sanitizeFilename(filename) {
  // Rimuove caratteri problematici e li sostituisce con un underscore
  return filename.replace(/["']+/g, '').replace(/[\s&]+/g, '_');
}

export default function CardProductDetail({ product, brand, image, apiImageUrl }) {

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image?.name) {
      // 1. Sanifichiamo il nome del file
      const sanitizedName = sanitizeFilename(image.name);

      // 2. Costruiamo l'URL finale
      const url = `${apiImageUrl}${sanitizedName}`;

      // 3. Impostiamo l'URL nello stato del componente
      setImageUrl(url);

      // DEBUG: Controlla questo URL nella console. Deve essere identico al percorso del file.
      console.log("URL immagine finale:", url);
    }
  }, [image, apiImageUrl]);

  const altText = product?.name ? `Immagine del prodotto: ${product.name}` : "Immagine del prodotto";

  return (
    <div className="card p-3 mb-3">
      <div className="card-body text-center">
        <h5 className="product_name text-dark">{product?.name}</h5>
        <p className="producer text-dark">
          <em>{brand?.name}</em>
        </p>
        <p className="price">{product?.price} $</p>

        {imageUrl ? (
          <div className="card-top mx-auto my-3 card-image-container">
            <img
              src={imageUrl}
              className="img-fluid rounded detail_img"
              alt={altText}
            />
          </div>
        ) : (
          <div>Caricamento immagine...</div>
        )}

        <p className="text-dark">
          {product?.additional_information}
        </p>
        <p className="text-dark">{product?.product_weight} Kg</p>
      </div>
    </div>
  );
}