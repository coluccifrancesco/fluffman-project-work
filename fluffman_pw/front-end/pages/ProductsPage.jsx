import { useEffect, useState } from "react";
import CardItem from "../components/CardComponent/CardItem";
import "../styles/ProductPages.css";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //product filtering IN page
  const [filter, setFilter] = useState("all"); //value di riferimento per mostrare tutti i prodotti prima del filtraggio

  useEffect(() => {
    fetch("http://localhost:3030/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento dei prodotti.");
        }
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  //filtering products IN page
  const getFilteredProducts = () => {
    switch (
      filter // switch filter con Select
    ) {
      case "dogs": //value del filtro
        return allProducts.filter((p) => p.animal_id === 1);
      case "cats":
        return allProducts.filter((p) => p.animal_id === 2);
      case "fish":
        return allProducts.filter((p) => p.animal_id === 3);
      case "rodents":
        return allProducts.filter((p) => p.animal_id === 4);
      case "birds":
        return allProducts.filter((p) => p.animal_id === 5);
      default:
        return allProducts;
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Caricamento...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Errore: {error}</div>;
  }

  return (
    <div className="hp_bg">
      <div className="p-3">
        <div className="container my-4">
          {/* Select di filtraggio dei prodotti */}

          <div className="text-start ">
            <select
              name="select-pet"
              id="select-pet"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select-pet  w-auto mx-auto"
              style={{ display: "inline-block" }}
            >
              <option value="all">Tutti i Prodotti</option>
              <option value="dogs">Cani</option>
              <option value="cats">Gatti</option>
              <option value="fish">Pesci</option>
              <option value="rodents">Roditori</option>
              <option value="birds">Uccelli</option>
            </select>
          </div>
          <h1 className="text-center my-5">Il nostro listino prodotti</h1>

          {/* Griglia per mostrare i prodotti filtrati */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {getFilteredProducts().map((product) => (
              <div key={product.id} className="col">
                <CardItem product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
