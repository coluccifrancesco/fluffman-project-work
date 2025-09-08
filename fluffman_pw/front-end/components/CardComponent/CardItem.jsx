import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function CardItem({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Naviga al percorso corretto, usando lo slug del prodotto
    navigate(`/products/slug/${product.slug}`);
  };

  const imageUrl = product?.image;

  return (
    <div className="card product_card text-center" onClick={handleCardClick}>
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
      <div className="card-body">
        <h5 className="card-title fs-4 product_name">{product?.name}</h5>
        <div className="card-bottom d-flex justify-content-around">
          <p className="card-text fs-5 pt-1 product_price">{product?.price} $</p>
          <div className="card-buttons d-flex align-items-start">
            <NavLink to="/">
              <i className="bi bi-star fs-4 me-3"></i>
            </NavLink>
            <NavLink to="/">
              <i className="bi bi-cart3 fs-4"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}