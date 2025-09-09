import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function CardItem({ product, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Naviga al percorso corretto, usando lo slug del prodotto
    navigate(`/products/${product.slug}`);
  };
  // const handleStarClick = () => {

  // }

  const imageUrl = product?.image;

  return (
    <div className="card product_card text-center">
      <div className="card-top mx-auto my-3 card-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            className="card-img-top img-fluid w-75"
            alt={product.name}
            onClick={handleCardClick}
          />
        ) : (
          <div className="placeholder-image">Immagine non disponibile</div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title fs-4 product_name" onClick={handleCardClick}>{product?.name}</h5>
        <div className="card-bottom d-flex justify-content-around">
          <p className="card-text fs-5 pt-1 product_price">{product?.price} $</p>
          <div className="card-buttons d-flex align-items-start">
            <button className="btn" type="button" onClick={() => onToggleFavorite(product.id)}>
              <i className={`bi fs-4 me-3 ${isFavorite ? "bi-star-fill text-access" : "bi-star"}`}></i>
            </button>
            <button className="btn" type="button" onClick={() => onToggleFavorite(product.id)}>
              <i className={`bi fs-4 me-3 ${isFavorite ? "bi-cart-fill text-access" : "bi-cart"}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}