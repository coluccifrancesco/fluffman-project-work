import ProductsSlider from "../components/ProductsSlider";
import { useEffect, useState } from "react";
import "../styles/ProductPages.css";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";

export default function OtherAnimalProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usa context per wishlist e carrello
  // const { wishlist } = useWishlist();
  // const { cart } = useCart();



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
        <ProductsSlider
          title="Tutto per il tuo acquario"
          products={fishProducts}
        />
      )}

      {/* Sezione Roditori */}
      {rodentProducts.length > 0 && (
        <ProductsSlider
          title="Cibo e accessori per roditori"
          products={rodentProducts}
        />
      )}

      {/* Sezione Uccelli */}
      {birdProducts.length > 0 && (
        <ProductsSlider
          title="Semi, gabbie e giochi per i tuoi uccelli"
          products={birdProducts}
        />
      )}
    </div>
  );
}