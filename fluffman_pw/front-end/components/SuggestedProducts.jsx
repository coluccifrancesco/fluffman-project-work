import CardItem from "./CardComponent/CardItem";
import { useState, useEffect } from "react";
import "../styles/SuggestedProducts.css";
import "../styles/Arrows.css";

export default function SuggestedProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);

  // Gestione wishlist
  const [wishlistIds, setWishlistIds] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  // Stato del carrello aggiornato per gestire gli oggetti { id, quantity }
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartlist")) || [];
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const resProd = await fetch(
          `http://localhost:3030/api/products?t=${Date.now()}`
        );
        const productsData = await resProd.json();

        const resImg = await fetch(
          `http://localhost:3030/api/images?t=${Date.now()}`
        );
        const imagesData = await resImg.json();

        const mergedProducts = productsData.map((p) => {
          const img = imagesData.find((i) => i.product_id === p.id);
          const imageUrl = img
            ? `http://localhost:3030/products_image/${img.name}`
            : "/images/default.jpg";
          return {
            ...p,
            image: imageUrl,
            image_path: img?.name || null
          };
        });

        const shuffledProducts = mergedProducts.sort(() => 0.5 - Math.random());
        const finalProducts = shuffledProducts.slice(0, 16);

        setProducts(finalProducts);
      } catch (err) {
        console.error("Errore fetch:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function handleSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  // Salva wishlist nel localStorage quando cambia
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Salva il carrello nel localStorage quando cambia
  useEffect(() => {
    localStorage.setItem("cartlist", JSON.stringify(cartItems));
  }, [cartItems]);

  // Funzione per gestire i preferiti
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
  }

  let cardsPerPage = 4;
  const isTablet = windowWidth >= 768 && windowWidth < 992;
  const isMobile = windowWidth < 768;
  if (isTablet) cardsPerPage = 2;

  const totalGroups = Math.ceil(products.length / cardsPerPage);

  function handleNext() {
    setCurrentIndex((currentIndex + 1) % totalGroups);
  }

  function handlePrev() {
    setCurrentIndex((currentIndex - 1 + totalGroups) % totalGroups);
  }

  const start = currentIndex * cardsPerPage;
  const visibleProducts = products.slice(start, start + cardsPerPage);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Caricamento in corso...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="section_container">
      <h2 className="my-4 text-center">I Consigli di Oggi</h2>

      {!isMobile ? (
        <div className="position-relative">
          <div className="arrow_left" onClick={handlePrev}></div>
          <div className="row justify-content-center g-3 px-2 mx-5">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className={`col-12 ${isTablet ? "col-md-6" : "col-md-3"}`}
              >
                <CardItem
                  product={product}
                  isFavorite={wishlistIds.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                  // Passiamo gli ID al componente figlio per mantenere la compatibilità
                  isInCart={cartItems.some(item => item?.id === product.id)}
                  onToggleAddToCart={onToggleAddToCart}
                />
              </div>
            ))}
          </div>
          <div className="arrow_right" onClick={handleNext}></div>
        </div>
      ) : (
        <div className="d-flex overflow-auto gap-3 pb-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: "80%", maxWidth: "250px" }}
            >
              <CardItem
                product={product}
                isFavorite={wishlistIds.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                // Passiamo gli ID al componente figlio per mantenere la compatibilità
                isInCart={cartItems.some(item => item.id === product.id)}
                onToggleAddToCart={onToggleAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}