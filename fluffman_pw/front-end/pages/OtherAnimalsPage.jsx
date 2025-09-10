import ProductsSlider from "../components/ProductsSlider";
import { useEffect, useState } from "react";
import "../styles/ProductPages.css";

export default function OtherAnimalProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Aggiungi lo stato per la wishlist, leggendo dal localStorage
  const [wishlistIds, setWishlistIds] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  // Stato del carrello aggiornato per gestire gli oggetti { id, quantity }
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartlist")) || [];
  });

  // Salva la wishlist nel localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Salva il carrello nel localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("cartlist", JSON.stringify(cartItems));
  }, [cartItems]);

  // Aggiungi la funzione per aggiungere/rimuovere un prodotto dai preferiti
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
          wishlistIds={wishlistIds}
          cartListId={cartItems.map(item => item.id)} // Passiamo gli ID al componente figlio per mantenere la compatibilità
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}

      {/* Sezione Roditori */}
      {rodentProducts.length > 0 && (
        <ProductsSlider
          title="Cibo e accessori per roditori"
          products={rodentProducts}
          wishlistIds={wishlistIds}
          cartListId={cartItems.map(item => item.id)} // Passiamo gli ID al componente figlio per mantenere la compatibilità
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}

      {/* Sezione Uccelli */}
      {birdProducts.length > 0 && (
        <ProductsSlider
          title="Semi, gabbie e giochi per i tuoi uccelli"
          products={birdProducts}
          wishlistIds={wishlistIds}
          cartListId={cartItems.map(item => item.id)} // Passiamo gli ID al componente figlio per mantenere la compatibilità
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}
    </div>
  );
}