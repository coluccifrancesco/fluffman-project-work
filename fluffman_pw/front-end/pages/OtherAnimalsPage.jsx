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

  // Contiene gli id dei prodotti nel carrello al primo caricamento cerco la chiave "cartlist" nel local storage, 
  // se esiste la trasforma in JSON ed in array, altrimenti []
  const [cartListId, setCartListId] = useState(() => {
    return JSON.parse(localStorage.getItem("cartlist")) || [];
  });

  // Salva la wishlist nel localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Ogni volta che cambiano gli id nel carrello, salva in local storage
  useEffect(() => {
    localStorage.setItem("cartlist", JSON.stringify(cartListId));
  }, [cartListId]);

  // Aggiungi la funzione per aggiungere/rimuovere un prodotto dai preferiti
  const onToggleFavorite = (productId) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds(wishlistIds.filter((id) => id !== productId));
    } else {
      setWishlistIds([...wishlistIds, productId]);
    }
  };

  // Premuto il bottone, se già presente l'id del prodotto lo rimuove, viceversa se assente
  const onToggleAddToCart = (productId) => {
    if (cartListId.includes(productId)) {
      setCartListId(cartListId.filter(id => id !== productId))
    } else {
      setCartListId([...cartListId, productId])
    }
  }

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
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}
    </div>
  );
}
