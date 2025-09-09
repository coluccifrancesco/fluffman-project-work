import CardItem from "./CardComponent/CardItem";
import { useState, useEffect } from "react";
import "../styles/SuggestedProducts.css";
import "../styles/Arrows.css";

export default function SuggestedProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch dei prodotti
        const productsResponse = await fetch(
          "http://localhost:3030/api/products"
        );
        const productsData = await productsResponse.json();

        const mergedProducts = await Promise.all(
          productsData.map(async (p) => {
            const imagesResponse = await fetch(
              `http://localhost:3030/api/images?productId=${p.id}`
            );
            const imagesData = await imagesResponse.json();

            const imageUrl = imagesData.length
              ? `http://localhost:3030/uploads/${imagesData[0].name}`
              : "/images/default.jpg";

            return {
              ...p,
              image: imageUrl,
            };
          })
        );

        // Mescola e seleziona i primi 16
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
    return <div className="text-center mt-5">Caricamento in corso...</div>;
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
              <CardItem product={product} onToggleFavorite={onToggleFavorite} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
