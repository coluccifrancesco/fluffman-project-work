import CardProductDetail from "../components/CardComponent/CardProductDetails";
import CardItem from "../components/CardComponent/CardItem";
import "../styles/SingleProductPage.css";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function SingleProductPage() {

  const [product, setProduct] = useState();
  const [brand, setBrand] = useState();
  const [image, setImage] = useState();
  const { id } = useParams()
  const apiProductUrl = `http://localhost:3030/api/products/${id}`
  const apiBrandUrl = `http://localhost:3030/api/brands/${id}`
  const apiImageUrl = `http://localhost:3030/api/images/${id}`

  useEffect(() => {
    fetch(apiProductUrl)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
      })
    fetch(apiBrandUrl)
      .then(res => res.json())
      .then(data => {
        setBrand(data)
      })
    fetch(apiBrandUrl)
      .then(res => res.json())
      .then(data => {
        setImage(data)
      })
  }, [])

  return (
    <div className="bg">
      <div className="container p-2">
        <div className="text-center">
          <h1 className="p-2">Dettagli sul prodotto</h1> {/* product.name */}
        </div>

        {/* Sezione Card + Descrizione */}
        <div className="row align-items-start g-4">
          <div className="col-md-6">
            <CardProductDetail product={product} brand={brand} image={image} />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-around">
            <div className="p-3 border rounded h-100 bg-light">
              <p className="text-dark text-center">
                {" "}
                <em>Nome Prodotto</em>
              </p>
              <p className="text-dark">
                {product?.description}
              </p>
              <p className="text-dark">
                {product?.age}
              </p>
              <p className="text-dark">
                {product?.food_type}
              </p>
              <p className="text-dark">
                {product?.pet_food_necessity}
              </p>
              <div className="tags">
                <ul className="list-unstyled d-flex flex-row gap-3 justify-content-center">
                  <li className="tag text-white p-2 bg-success rounded">Tag</li>
                  <li className="tag text-white p-2 bg-info bg-gradient rounded">
                    Tag
                  </li>
                  <li className="tag text-white p-2 bg-primary bg-gradient rounded">
                    Tag
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

        {/* Prodotti simili */}
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
