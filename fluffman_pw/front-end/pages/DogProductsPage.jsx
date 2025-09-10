import ProductsSlider from "../components/ProductsSlider";
import CatLoading from "../components/Loading";
import "../styles/ProductPages.css";
import { useEffect, useState } from "react";

export default function DogProductsPage() {
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
    const existingProduct = cartItems.find(item => item?.id === productId);

    if (existingProduct) {
      setCartItems(cartItems.filter(item => item?.id !== productId));
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
        <h1>Il meglio per il tuo cane</h1>
        <p className="text-light">
          La nostra ampia scelta di prodotti per cani, propone prodotti di
          altissima qualità per prenderti cura al meglio del tuo amico a 4 zampe
        </p>
      </div>
      {/* Sezione Food */}
      {foodProducts.length > 0 && (
        <ProductsSlider
          title="Il tuo cane merita di mangiare da re"
          products={foodProducts}
          wishlistIds={wishlistIds}
          cartListId={cartItems.map(item => item?.id)} // Passiamo gli ID al componente figlio per mantenere la compatibilità
          onToggleFavorite={onToggleFavorite}
          onToggleAddToCart={onToggleAddToCart}
        />
      )}
      {/* Sezione Accessories  */}
      {accessoryProducts.length > 0 && (
        <ProductsSlider
          title="Giochi, collari, cucce, tutto, ma proprio tutto ciò che serve per il
            tuo cane"
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