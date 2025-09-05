export default function CardItem({ name, image, price }) {
  // se l'immagine è solo un nome file preso dal DB, la recupero dalla cartella /public/products
  const imageUrl = image ? `/products/${image}` : "/placeholder.png";

  return (
    <div className="card shadow-sm img-fluid d-flex align-items-center justify-content-center mx-auto">
      <img
        className="card-img-top p-3"
        src={imageUrl}
        alt={name}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price} €</p>
      </div>
    </div>
  );
}
