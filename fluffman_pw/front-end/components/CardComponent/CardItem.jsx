export default function CardItem({ title, image, price }) {
  return (
    <div className="card shadow-sm img-fluid d-flex align-items-center justify-content-center mx-auto">
      <img
        className="card-img-top p-3"
        src={`../products/${image}`}
        alt={title}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{price} €</p>
      </div>
    </div>
  );
}
