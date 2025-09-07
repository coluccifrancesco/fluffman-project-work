import CardProductDetail from "../components/CardComponent/CardProductDetails";
import CardItem from "../components/CardComponent/CardItem";
import "../styles/SingleProductPage.css";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function SingleProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Chiamata 1: Fetch dei dati del prodotto
    fetch(`http://localhost:3030/api/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Prodotto non trovato.');
        }
        return res.json();
      })
      .then(productData => {
        setProduct(productData);

        if (!productData || !productData.id) {
          throw new Error('Dati del prodotto non disponibili.');
        }

        const brandId = productData.brand_id;
        const imageId = productData.id;

        // Chiamata 2 & 3: Fetch di brand e immagine in parallelo
        const brandPromise = fetch(`http://localhost:3030/api/brands/${brandId}`).then(res => res.json());
        const imagePromise = fetch(`http://localhost:3030/api/images/${imageId}`).then(res => res.json());

        return Promise.all([brandPromise, imagePromise]);
      })
      .then(([brandData, imageData]) => {
        setBrand(brandData);
        setImage(imageData);
        console.log('Dati immagine ricevuti:', imageData);
      })
      .catch(err => {
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
              apiImageUrl={"http://localhost:3030/products_image/"} />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-around">
            <div className="p-3 border rounded h-100 bg-light">
              <p className="text-dark my-5 mx-3">
                {product?.description}
              </p>
              <div className="tags">
                <ul className="list-unstyled d-flex flex-row gap-4 justify-content-evenly">
                  <li className="tag p-2 bg-body-secondary rounded">
                    <p className="text-success my-1">
                      {product?.pet_food_necessity}
                    </p></li>
                  <li className="tag text-center p-2 bg-body-secondary bg-gradient rounded">
                    <p className="text-success my-1">
                      {product?.food_type}
                    </p>
                  </li>
                  <li className="tag p-2 bg-body-secondary bg-gradient rounded">
                    <p className="text-success my-1">
                      {product?.age}
                    </p>
                  </li>
                </ul>
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