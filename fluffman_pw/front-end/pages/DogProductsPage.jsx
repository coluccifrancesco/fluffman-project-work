import CardItem from "../components/CardComponent/CardItem";
import "../styles/ProductPages.css";
import { useEffect, useState } from "react";

export default function DogProductsPage() {
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
        const dogProducts = allProducts.filter(
          (product) => product.animal_id === 1
        );
        setProducts(dogProducts);
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
        <h1>Il meglio per il tuo cane</h1>
        <p className="text-light">
          La nostra ampia scelta di prodotti per cani, propone prodotti di
          altissima qualità per prenderti cura al meglio del tuo amico a 4 zampe
        </p>
      </div>

      {/* Sezione Food */}
      {foodProducts.length > 0 && (
        <div className="m-2 p-2">
          <h2 className="p-2">Il tuo cane merita di mangiare da re</h2>
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
            Giochi, collari, cucce, tutto, ma proprio tutto ciò che serve per il
            tuo cane
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
            Tutto ciò che serve per la cura del tuo cane lo trovi qui
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