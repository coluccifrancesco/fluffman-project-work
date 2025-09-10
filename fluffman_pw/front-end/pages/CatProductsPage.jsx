import ProductsSlider from "../components/ProductsSlider";
import CatLoading from "../components/Loading";
import "../styles/ProductPages.css";
import { useEffect, useState } from "react";

export default function CatProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [wishlistIds, setWishlistIds] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  // Lo stato del carrello adesso contiene gli oggetti { id, quantity }
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Quando il carrello cambia, salva i nuovi dati
  useEffect(() => {
    localStorage.setItem("cartlist", JSON.stringify(cartItems));
  }, [cartItems]);

  const onToggleFavorite = (productId) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds(wishlistIds.filter((id) => id !== productId));
    } else {
      setWishlistIds([...wishlistIds, productId]);
    }
  };

  // Funzione di aggiunta/rimozione modificata per usare un array di oggetti
  const onToggleAddToCart = (productId) => {
    const existingProduct = cartItems.find(item => item.id === productId);

    if (existingProduct) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

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
    (product) =>
      product.pet_food_necessity && product.pet_food_necessity !== "N/A"
  );
  const accessoryProducts = products.filter(
    (product) => product.accessories === 1
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

      {foodProducts.length > 0 && (
        <ProductsSlider
          title="Un lauto pasto per il tuo gatto esigente"
          products={foodProducts}
          wishlistIds={wishlistIds}
          cartListId={cartItems.map(item => item?.id)} // Passiamo gli ID al componente figlio per mantenere la compatibilità
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}

      {accessoryProducts.length > 0 && (
        <ProductsSlider
          title="Tiragraffi, lettiere, ciotole, giochi: qui trovi tutto!"
          products={accessoryProducts}
          wishlistIds={wishlistIds}
          cartListId={cartItems.map(item => item?.id)} // Passiamo gli ID al componente figlio per mantenere la compatibilità
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}
    </div>
  );
}