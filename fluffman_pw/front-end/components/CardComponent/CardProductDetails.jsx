export default function CardProductDetail({ product, brand, image }) {
  return (
    <div className="card p-3 mb-3">
      <div className="card-body text-center">
        <h5 className="product_name text-dark">{product?.name}</h5>
        <p className="producer text-dark">
          <em>{brand?.name}</em>
        </p>
        <p className="price">{product?.price} $</p>

        {/* Immagine spostata sotto il titolo */}
        <div className="card-top mx-auto my-3" style={{ width: "100%" }}>
          <img
            src={image?.name}
            className="img-fluid rounded detail_img"
            alt={image?.name}
          />
        </div>

        <p className="text-dark">
          {product?.additional_information}
        </p>
        <p className="text-dark">{product?.product_weight} Kg</p>
      </div>
    </div>
  );
}
