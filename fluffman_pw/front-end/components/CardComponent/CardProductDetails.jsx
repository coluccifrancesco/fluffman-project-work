export default function CardProductDetail() {
  return (
    <div className="card p-3 mb-3">
      <div className="card-body text-center">
        <h5 className="product_name text-dark">Nome del prodotto</h5>
        <p className="producer text-dark">Nome dell'azienda produttrice</p>
        <p className="price text-dark">Prezzo del prodotto</p>

        {/* Immagine spostata sotto il titolo */}
        <div className="card-top mx-auto my-3" style={{ width: "100%" }}>
          <img
            src="/happy_dog.jpg"
            className="img-fluid rounded detail_img"
            alt="product_img"
          />
        </div>

        <div className="card_bottom">Lorem ipsum dolor sit amet.</div>
        <p className="text-dark">Breve Descrizione Prodotto</p>
        <p className="text-dark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
          exercitationem.
        </p>
      </div>
    </div>
  );
}
