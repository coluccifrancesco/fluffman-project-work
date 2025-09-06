import { sanitizeFilename } from "../../utils/stringUtils";
import { useNavigate } from "react-router-dom";

export default function CardItem({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  // Costruisci l'URL dell'immagine in modo sicuro
  const imageUrl = product?.image
    ? `http://localhost:3030/products_image/${sanitizeFilename(product.image)}`
    : null;

  return (
    <div className="card product_card text-center" onClick={handleCardClick}>
      <div className="card-top mx-auto my-3 card-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            className="card-img-top img-fluid"
            alt={product.name}
          />
        ) : (
          <div className="placeholder-image">Immagine non disponibile</div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title product_name">{product?.name}</h5>
        <p className="card-text product_price">{product?.price} $</p>
      </div>
    </div>
  );
}