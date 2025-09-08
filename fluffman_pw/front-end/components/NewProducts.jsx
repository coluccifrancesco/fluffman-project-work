import CardItem from "./CardComponent/CardItem";
import { useState, useEffect } from "react";
import "../styles/NewProducts.css";
import "../styles/Arrows.css";

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:3030/api/products?t=${Date.now()}`
        );
        const productsData = await res.json();

        const productsWithImageUrls = productsData.map(p => ({
          ...p,
          image: p.image_name
            ? `http://localhost:3030/products_image/${p.image_name}`
            : "/images/default.jpg"
        }));

        setProducts(productsWithImageUrls.sort(() => 0.5 - Math.random()).slice(0, 16));
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
      {!isMobile ? (
        <div className="position-relative">
          <div className="arrow_left" onClick={handlePrev}></div>
          <div className="row justify-content-center g-3 px-2 mx-5">
            {visibleProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className={`col-12 ${isTablet ? "col-md-6" : "col-md-3"}`}
                >
                  <CardItem product={product} />
                </div>
              );
            })}
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