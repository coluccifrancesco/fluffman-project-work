import React, { useState, useEffect } from "react";
import CardItem from "./CardComponent/CardItem";

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
        const products = await resProd.json();

        const resImg = await fetch(
          `http://localhost:3030/api/images?t=${Date.now()}`
        );
        const images = await resImg.json();

        const merged = products.map((p) => {
          const img = images.find((i) => i.product_id === p.id);
          const imageUrl = img
            ? `http://localhost:3030/products_image/${img.name}`
            : "/images/default.jpg";
          return { ...p, image: imageUrl };
        });

        setProducts(merged.sort(() => 0.5 - Math.random()).slice(0, 16));
      } catch (err) {
        console.error("Errore fetch:", err);
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


  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Salva il carrello nel localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("cartlist", JSON.stringify(cartItems));
  }, [cartItems]);

  // Funzione di aggiunta/rimozione modificata per usare un array di oggetti
  const onToggleAddToCart = (productId) => {
    const existingProduct = cartItems.find(item => item.id === productId);

    if (existingProduct) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  const onToggleFavorite = (productId) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds(wishlistIds.filter((id) => id !== productId));
    } else {
      setWishlistIds([...wishlistIds, productId]);
    }
  };

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

  return (
    <div className="section_container">
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
                  isInCart={cartItems.some(item => item.id === product.id)}
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