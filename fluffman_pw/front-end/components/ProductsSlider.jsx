//*COMPONENTE PRODUCT SLIDER -
//*riproduce la logica usata nella HomePage per applicarla ad altre pagine, possibilità di aggiornare la HomePage in seguito con questo componente

import { useState, useEffect } from "react";
import CardItem from "./CardComponent/CardItem";
import "../styles/ProductsSlider.css";

export default function ProductsSlider({ title, products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let cardsPerPage = 4;
  const isTablet = windowWidth >= 768 && windowWidth < 992;
  const isMobile = windowWidth < 768;

  if (isTablet) cardsPerPage = 2;

  const totalGroups = Math.ceil(products.length / cardsPerPage);

  function handleNext() {
    setCurrentIndex((prev) => (prev + 1) % totalGroups);
  }

  function handlePrev() {
    setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
  }

  const start = currentIndex * cardsPerPage;
  const visibleProducts = products.slice(start, start + cardsPerPage);

  return (
    <div className="m-2 p-2">
      {/* TITLE PROP PER IMPORTAZIONE */}
      <h2 className="p-2">{title}</h2>

      {/* logica di rendering delle frecce e dello slider in mobile */}
      {!isMobile ? (
        <div className="position-relative">
          <div className="arrow_left_slider" onClick={handlePrev}></div>
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
          <div className="arrow_right_slider" onClick={handleNext}></div>
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
