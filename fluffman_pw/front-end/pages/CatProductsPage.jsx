import CardItem from "../components/CardComponent/CardItem";
import "../styles/ProductPages.css";
import { useEffect, useState } from "react";

export default function CatProductsPage() {
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
        const catProducts = allProducts.filter(
          (product) => product.animal_id === 2
        );
        setProducts(catProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const foodProducts = products.filter(
    (product) => product.pet_food_necessity && product.pet_food_necessity !== "N/A"
  );
  const accessoryProducts = products.filter(
    (product) => product.accessories === 1
  );
  const careProducts = products.filter(
    (product) => product.product_care_type && product.product_care_type !== "N/A"
  );

  if (loading) {
    return <div className="text-center mt-5">Caricamento...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Errore: {error}</div>;
  }

  return (
    <div className="bg p-2">
      <div className="m-2 p-2 text-center">
        <h1>Il regno dei Gatti</h1>
        <p className="text-light">
          Corrono, saltano, miagolano, qui una vasta scelta per avere un gatto
          sempre felice
        </p>
      </div>

      {/* Sezione Food */}
      {foodProducts.length > 0 && (
        <div className="m-2 p-2">
          <h2 className="p-2">Un lauto pasto per il tuo gatto esigente</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
            {foodProducts.map((product) => (
              <div key={product.id} className="col">
                <CardItem product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sezione accessori */}
      {accessoryProducts.length > 0 && (
        <div className="m-2 p-2">
          <h2 className="p-2">
            Tiragraffi, lettiere, ciotole per il cibo, giochi, se qualcosa manca
            al tuo gatto lo trovi qui
          </h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
            {accessoryProducts.map((product) => (
              <div key={product.id} className="col">
                <CardItem product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sezione Cura */}
      {careProducts.length > 0 && (
        <div className="m-2 p-2">
          <h2 className="p-2">
            Un gatto bello e in salute, con i nostri prodotti
          </h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
            {careProducts.map((product) => (
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