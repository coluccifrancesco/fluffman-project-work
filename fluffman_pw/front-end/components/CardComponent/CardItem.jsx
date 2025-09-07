import { useNavigate } from "react-router-dom";

export default function CardItem({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/SingleProductPage/${product.id}`);
  };

  // L'URL dell'immagine è già stato costruito in NewProducts.jsx,
  // quindi lo usiamo direttamente.
  const imageUrl = product?.image;

  return (
    <div className="card h-100 product_card text-center" onClick={handleCardClick}>
      <div className="card-top mx-auto my-3 card-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            className="card-img-top img-fluid w-75"
            alt={product.name}
          />
        ) : (
          <div className="placeholder-image">Immagine non disponibile</div>
        )}
      </div>
      <div className="card-body ">
        <h5 className="card-title product_name">{product?.name}</h5>
        <p className="card-text product_price">{product?.price} $</p>
      </div>
    </div>
  );
}
