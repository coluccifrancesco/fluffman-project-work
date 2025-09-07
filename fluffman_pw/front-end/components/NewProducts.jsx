import CardItem from "./CardComponent/CardItem";
import { useState, useEffect } from "react";
import "../styles/NewProducts.css";

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch products and images with a cache-busting query parameter
        // Questo parametro forza il browser a non usare la cache per questa richiesta
        const resProd = await fetch(
          `http://localhost:3030/api/products?t=${Date.now()}`
        );
        const products = await resProd.json();

        const resImg = await fetch(
          `http://localhost:3030/api/images?t=${Date.now()}`
        );
        const images = await resImg.json();

        // LOGGING: Controlla i dati che arrivano dal backend
        console.log("Dati dei prodotti:", products);
        console.log("Dati delle immagini:", images);

        // unisci immagini ai prodotti e costruisci l'URL completo
        const merged = products.map((p) => {
          const img = images.find((i) => i.product_id === p.id);
          // Se un'immagine è trovata, costruisci l'URL completo usando la proprietà 'name'
          const imageUrl = img
            ? `http://localhost:3030/products_image/${img.name}`
            : "/images/default.jpg";
          console.log(`Prodotto ID: ${p.id} - URL Immagine: ${imageUrl}`);
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
      <h2 className="my-4 text-center">Ultimi Arrivi</h2>

      {!isMobile ? (
        <div className="position-relative">
          <div className="arrow_left" onClick={handlePrev}></div>
          <div className="row justify-content-center g-3 px-2 mx-5">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className={`col-12 ${isTablet ? "col-md-6" : "col-md-3"}`}
              >
                <CardItem product={product} />
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
              <CardItem product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
