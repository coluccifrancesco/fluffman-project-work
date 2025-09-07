import { useEffect, useState } from "react";

export default function CardProductDetail({
  product,
  brand,
  image,
  apiImageUrl,
}) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image?.name) {
      // NON codificare il nome. Usa direttamente il nome dell'immagine
      // che ti arriva dal backend.

      const url = `${apiImageUrl}${image.name}`;

      setImageUrl(url);

      // DEBUG: controlla l'URL. Dovrebbe essere senza %25.
      console.log("URL immagine finale:", url);
    }
  }, [image, apiImageUrl]);

  const altText = product?.name
    ? `Immagine del prodotto: ${product.name}`
    : "Immagine del prodotto";

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
        {product?.product_weight && (
          <p className="text-dark">{product?.product_weight} Kg</p>
        )}
      </div>
    </div>
  );
}
