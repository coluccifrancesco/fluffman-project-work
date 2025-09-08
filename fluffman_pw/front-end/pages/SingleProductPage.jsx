import CardProductDetail from "../components/CardComponent/CardProductDetails";
import NewProducts from "../components/NewProducts";
import "../styles/SingleProductPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleProductPage() {
  const { slug } = useParams(); // <-- Usa 'slug' invece di 'id'
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const animalTypes = {
    1: 'cane', 2: 'gatto', 3: 'pesce', 4: 'roditore', 5: 'uccello'
  };

  useEffect(() => {
    // Esci se lo slug non è presente per evitare l'errore 404
    if (!slug) {
      return;
    }

    // Unica chiamata API: il backend ora restituisce tutti i dati uniti
    fetch(`http://localhost:3030/api/products/${slug}`) // <-- Usa la rotta per slug
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
  }, [slug]); // <-- Dipendenza aggiornata a 'slug'

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
              image={{ name: product.image_name }}
              apiImageUrl={"http://localhost:3030/products_image/"}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-around">
            <div className="p-3 border rounded h-100 bg-light">
              <b>
                <p className="mt-3 mb-0 text-dark fs-5">Descrizione Prodotto</p>
              </b>
              <p className="text-dark ">{product?.description}</p>
              <b>
                <p className="mt-3 mb-0 text-dark fs-5">Informazioni Aggiuntive</p>
              </b>
              <p className="text-dark ">{product?.additional_information}</p>

              <div className="mt-5">
                {(product?.animal_id ||
                  product?.pet_food_necessity ||
                  product?.food_type ||
                  product?.age ||
                  product?.weight ||
                  product?.hair ||
                  product?.product_weight ||
                  product?.biological ||
                  product?.accessories) && (
                    <div className="tags">
                      <ul className="list-unstyled d-flex flex-row gap-4 flex-wrap justify-content-center">
                        {product?.animal_id && (
                          <li className="tag p-2 bg-body-secondary rounded">
                            <p className="text-success my-1">{animalTypes[product.animal_id]}</p>
                          </li>
                        )}
                        {product?.pet_food_necessity && (
                          <li className="tag p-2 bg-body-secondary rounded">
                            <p className="text-success my-1">{product.pet_food_necessity}</p>
                          </li>
                        )}
                        {product?.food_type && (
                          <li className="tag p-2 bg-body-secondary rounded">
                            <p className="text-success my-1">{product.food_type}</p>
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
                            <p className="text-success my-1">{Number(product.product_weight).toFixed(0)} kg</p>
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
                Aggiungi al Carrello <i className="fa-solid fa-cart-shopping btn-cart"></i>
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