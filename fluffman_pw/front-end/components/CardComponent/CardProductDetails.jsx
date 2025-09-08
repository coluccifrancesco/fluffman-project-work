import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faEuroSign } from "@fortawesome/free-solid-svg-icons";

export default function CardProductDetail({ product, brand, imagePath }) {
  return (
    <div className="card product-card h-100 shadow-sm">
      <div className="product-image-container">
        {/* Usa direttamente la prop 'imagePath' come src */}
        <img
          src={imagePath}
          className="img-fluid"
          alt={product.name}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center text-dark fw-bold mb-3">{product.name}</h5>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-secondary fw-bold">
              <FontAwesomeIcon icon={faTag} className="me-2" />
              {brand.name}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            {product.discount_price ? (
              <>
                <div className="price-container">
                  <span className="text-decoration-line-through text-muted me-2">
                    <FontAwesomeIcon icon={faEuroSign} /> {product.price}
                  </span>
                  <span className="text-danger fw-bold fs-5">
                    <FontAwesomeIcon icon={faEuroSign} /> {product.discount_price}
                  </span>
                </div>
              </>
            ) : (
              <span className="price text-dark fw-bold fs-5">
                <FontAwesomeIcon icon={faEuroSign} /> {product.price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}