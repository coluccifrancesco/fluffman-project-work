import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faEuroSign } from "@fortawesome/free-solid-svg-icons";

function CardItem({ product, onToggleFavorite, isFavorite, onAddToCart, isInCart }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.slug}`);
  };

  const BASE_URL = "http://localhost:3030";

  // Gestione robusta degli URL delle immagini
  let imageUrl = null;

  if (product?.image_path) {
    let cleanPath = product.image_path.trim();

    // Rimuovi eventuali duplicazioni nell'URL
    const baseUrlPattern = "http://localhost:3030/api/images/";
    if (cleanPath.includes(baseUrlPattern)) {
      const lastIndex = cleanPath.lastIndexOf(baseUrlPattern);
      if (lastIndex > 0) {
        cleanPath = cleanPath.substring(lastIndex);
      }
    }

    // Costruisci l'URL finale
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
      imageUrl = cleanPath;
    } else if (cleanPath.startsWith('/api/images/')) {
      imageUrl = `${BASE_URL}${cleanPath}`;
    } else {
      imageUrl = `${BASE_URL}/api/images/${cleanPath}`;
    }
  }

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling?.classList.remove('d-none');
  };

  return (
    <div className="card product_card text-center h-100">
      <div className="card-top mx-auto my-3 card-image-container">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              className="card-img-top img-fluid w-75"
              alt={product?.name || 'Immagine prodotto'}
              onClick={handleCardClick}
              onError={handleImageError}
              style={{ cursor: 'pointer' }}
            />
            <div className="placeholder-image d-none">
              <div className="text-muted p-3">
                <i className="bi bi-image fs-1"></i>
                <p className="mt-2">Immagine non disponibile</p>
              </div>
            </div>
          </>
        ) : (
          <div className="placeholder-image">
            <div className="text-muted p-3">
              <i className="bi bi-image fs-1"></i>
              <p className="mt-2">Nessuna immagine</p>
            </div>
          </div>
        )}
      </div>

      <div className="card-body">
        <h5
          className="card-title fs-4 product_name"
          onClick={handleCardClick}
          style={{ cursor: 'pointer' }}
        >
          {product?.name}
        </h5>

        <div className="card-bottom d-flex justify-content-around align-items-center">
          {product.discount_price ? (
            <>
              <div className="price-container">
                <span className="text-decoration-line-through text-muted me-1">
                  <FontAwesomeIcon icon={faEuroSign} />{product.price}
                </span>
                <span className="text-danger fw-bold fs-5">
                  <FontAwesomeIcon icon={faEuroSign} />{product.discount_price}
                </span>
              </div>
            </>
          ) : (
            <span className="price text-dark fw-bold fs-5">
              <FontAwesomeIcon icon={faEuroSign} />{product.price}
            </span>
          )}

          <div className="card-buttons d-flex align-items-start">
            <button
              className="btn p-0"
              type="button"
              onClick={() => onToggleFavorite(product.id)}
              title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
            >
              <i className={`bi fs-4 me-3 ${isFavorite ? "bi-star-fill text-warning" : "bi-star"}`}></i>
            </button>

            <button
              className="btn p-0"
              type="button"
              onClick={() => onAddToCart(product.id)}
              title={isInCart ? "Rimuovi dal carrello" : "Aggiungi al carrello"}
            >
              <i className={`bi fs-4 me-3 ${isInCart ? "bi-cart-fill text-success" : "bi-cart"}`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardItem;