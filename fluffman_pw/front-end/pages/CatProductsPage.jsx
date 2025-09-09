import ProductsSlider from "../components/ProductsSlider";
import CatLoading from "../components/Loading";
import "../styles/ProductPages.css";
import { useEffect, useState } from "react";

export default function CatProductsPage() {
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
    if (cartListId.includes(productId)){
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

  //categories

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

      {/* Sezione Food */}
      {foodProducts.length > 0 && (
        <ProductsSlider
          title="Un lauto pasto per il tuo gatto esigente"
          products={foodProducts}
          wishlistIds={wishlistIds}
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}

      {/* Sezione Accessories */}
      {accessoryProducts.length > 0 && (
        <ProductsSlider
          title="Tiragraffi, lettiere, ciotole, giochi: qui trovi tutto!"
          products={accessoryProducts}
          wishlistIds={wishlistIds}
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}
    </div>
  );
}
