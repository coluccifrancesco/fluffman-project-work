import CardProductDetail from "../components/CardComponent/CardProductDetails";
import NewProducts from "../components/NewProducts";
import "../styles/SingleProductPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TagsComponent from "../components/TagsComponent";

export default function SingleProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      return;
    }

    fetch(`http://localhost:3030/api/products/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Prodotto non trovato.");
        }
        return res.json();
      })
      .then((productData) => {
        if (!productData) {
          throw new Error("Dati del prodotto non disponibili.");
        }
        setProduct(productData);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [slug]);

  if (error) {
    return <div className="text-center mt-5 text-danger">Errore: {error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">Caricamento...</div>;
  }

  return (
    <div className="bg">
      <div className="container p-2">
        <div className="text-center">
          <h1 className="p-2">{product?.name || "Dettagli sul prodotto"}</h1>
        </div>

        <div className="row align-items-start g-4">
          <div className="col-md-6">
            <CardProductDetail
              product={product}
              brand={{ name: product.brand_name }}
              // Passa direttamente il percorso completo che ricevi dall'API
              imagePath={product.image_path}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-around">
            <div className="p-3 border rounded h-100 bg-light">
              <b>
                <p className="mt-3 mb-0 text-dark fs-5">Descrizione Prodotto</p>
              </b>
              <p className="text-dark ">{product?.description}</p>
              <b>
                <p className="mt-3 mb-0 text-dark fs-5">
                  Informazioni Aggiuntive
                </p>
              </b>
              <p className="text-dark ">{product?.additional_information}</p>
              <TagsComponent product={product} />
            </div>
            <div className="button-container d-flex justify-content-center">
              <button className="cart-btn mt-3 w-50 p-2" type="button">
                Aggiungi al Carrello{" "}
                <i className="fa-solid fa-cart-shopping btn-cart"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="container m-2 p-2">
          <h2 className="my-4 text-center">Prodotti Simili</h2>
          <NewProducts />
        </div>
      </div>
    </div>
  );
}