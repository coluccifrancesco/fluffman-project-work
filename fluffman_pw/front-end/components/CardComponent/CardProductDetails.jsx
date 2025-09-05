export default function CardProductDetail({ product }) {
  return (
    <div className="card p-3 mb-3">
      <div className="card-body text-center">
        <h5 className="product_name text-dark">{/*{product?.name}*/}Nome prodotto</h5>
        <p className="producer text-dark">
          <em>Nome dell'azienda produttrice</em>
        </p>
        <p className="price"> 20,90 €</p>

        {/* Immagine spostata sotto il titolo */}
        <div className="card-top mx-auto my-3" style={{ width: "100%" }}>
          <img
            src="/products/product1.webp"
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
