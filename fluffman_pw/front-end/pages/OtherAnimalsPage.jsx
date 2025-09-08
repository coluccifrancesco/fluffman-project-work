import CardItem from "../components/CardComponent/CardItem";
import { useEffect, useState } from "react";
import "../styles/ProductPages.css";

export default function OtherAnimalProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3030/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento dei prodotti.");
        }
        return res.json();
      })
      .then((allProducts) => {
        setProducts(allProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const fishProducts = products.filter((product) => product.animal_id === 3);
  const rodentProducts = products.filter((product) => product.animal_id === 4);
  const birdProducts = products.filter((product) => product.animal_id === 5);

  if (loading) {
    return <div className="text-center mt-5">Caricamento...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Errore: {error}</div>;
  }

  return (
    <div className="bg p-2">
      <div className="m-2 p-2 text-center">
        <h1>Non solo cani e gatti</h1>
        <p className="text-light">
          Pappagalli, criceti, pesci rossi, qui trovi prodotti per ogni animale
        </p>
      </div>

      {/* Sezione Pesci */}
      {fishProducts.length > 0 && (
        <div className="m-2 p-2">
          <h2 className="p-2">Tutto per il tuo acquario</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
            {fishProducts.map((product) => (
              <div key={product.id} className="col">
                <CardItem product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sezione Roditori */}
      {rodentProducts.length > 0 && (
        <div className="m-2 p-2">
          <h2 className="p-2">Cibo e accessori per roditori</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
            {rodentProducts.map((product) => (
              <div key={product.id} className="col">
                <CardItem product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sezione Uccelli */}
      {birdProducts.length > 0 && (
        <div className="m-2 p-2">
          <h2 className="p-2">Semi, gabbie e giochi per i tuoi uccelli</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
            {birdProducts.map((product) => (
              <div key={product.id} className="col">
                <CardItem product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}