import CardProductDetail from "../components/CardComponent/CardProductDetails";
import CardItem from "../components/CardComponent/CardItem";
import "../styles/SingleProductPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Chiamata 1: Fetch dei dati del prodotto
    fetch(`http://localhost:3030/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Prodotto non trovato.");
        }
        return res.json();
      })
      .then((productData) => {
        setProduct(productData);

        if (!productData || !productData.id) {
          throw new Error("Dati del prodotto non disponibili.");
        }

        const brandId = productData.brand_id;
        const imageId = productData.id;

        // Chiamata 2 & 3: Fetch di brand e immagine in parallelo
        const brandPromise = fetch(
          `http://localhost:3030/api/brands/${brandId}`
        ).then((res) => res.json());
        const imagePromise = fetch(
          `http://localhost:3030/api/images/${imageId}`
        ).then((res) => res.json());

        return Promise.all([brandPromise, imagePromise]);
      })
      .then(([brandData, imageData]) => {
        setBrand(brandData);
        setImage(imageData);
        console.log("Dati immagine ricevuti:", imageData);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) {
    return <div className="text-center mt-5 text-danger">Errore: {error}</div>;
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
              brand={brand}
              image={image} // Passa l'oggetto 'image' non modificato
              apiImageUrl={"http://localhost:3030/products_image/"}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-around">
            <div className="p-3 border rounded h-100 bg-light">
              <b>
                <p className="mt-3 mb-0 text-dark fs-5">
                  {" "}
                  Descrizione Prodotto{" "}
                </p>
              </b>
              <p className="text-dark ">{product?.description}</p>
              <b>
                <p className="mt-3 mb-0 text-dark fs-5">
                  {" "}
                  Informazioni Aggiuntive{" "}
                </p>
              </b>
              <p className="text-dark ">{product?.additional_information}</p>

              <div className="mt-5">
                {(product?.pet_food_necessity ||
                  product?.food_type ||
                  product?.age ||
                  product?.weight ||
                  product?.hair ||
                  product?.product_weight ||
                  product?.biological ||
                  product?.accessories) && (
                  <div className="tags">
                    <ul className="list-unstyled d-flex flex-row gap-4 flex-wrap justify-content-center">
                      {product?.pet_food_necessity && (
                        <li className="tag p-2 bg-body-secondary rounded">
                          <p className="text-success my-1">
                            {product.pet_food_necessity}
                          </p>
                        </li>
                      )}
                      {product?.food_type && (
                        <li className="tag p-2 bg-body-secondary rounded">
                          <p className="text-success my-1">
                            {product.food_type}
                          </p>
                        </li>
                      )}
                      {product?.age && (
                        <li className="tag p-2 bg-body-secondary rounded">
                          <p className="text-success my-1">{product.age}</p>
                        </li>
                      )}
                      {product?.weight && (
                        <li className="tag p-2 bg-body-secondary rounded">
                          <p className="text-success my-1">{product.weight}</p>
                        </li>
                      )}
                      {product?.hair && (
                        <li className="tag p-2 bg-body-secondary rounded">
                          <p className="text-success my-1">{product.hair}</p>
                        </li>
                      )}
                      {product?.product_weight && (
                        <li className="tag p-2 bg-body-secondary rounded">
                          <p className="text-success my-1">
                            {Number(product.product_weight).toFixed(0)} kg
                          </p>
                        </li>
                      )}
                      {product?.biological === 1 && (
                        <li className="tag p-2 bg-body-secondary rounded">
                          <p className="text-success my-1">Bio</p>
                        </li>
                      )}
                      {product?.accessories === 1 && (
                        <li className="tag p-2 bg-body-secondary rounded">
                          <p className="text-success my-1">Accessori</p>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="button-container d-flex justify-content-center">
              <button className="cart-btn mt-3 w-50 p-2" type="button">
                Aggiungi al Carrello{" "}
                <i className="fa-solid fa-cart-shopping btn-cart"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="m-2 p-2">
          <h2>Prodotti simili</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
            {[...Array(6)].map((_, idx) => (
              <CardItem key={idx} title={`Scelta ${idx + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
