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
        const resProd = await fetch("http://localhost:3030/api/products");
        const products = await resProd.json();

        const resImg = await fetch("http://localhost:3030/api/images");
        const images = await resImg.json();

        // unisci immagini ai prodotti
        const merged = products.map(p => {
          const img = images.find(i => i.product_id === p.id);
          return { ...p, image: img ? img.url : "/images/default.jpg" };
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
          <button
            id="arrow_left"
            className="arrow-btn position-absolute top-50 start-0 translate-middle-y"
            onClick={handlePrev}
          >
            <i className="bi bi-arrow-left-square"></i>
          </button>

          <div className="row justify-content-center g-4 px-5 mx-3">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className={`col-12 ${isTablet ? "col-md-6" : "col-md-3"}`}
              >
                <CardItem product={product} />
              </div>
            ))}
          </div>

          <button
            id="arrow_right"
            className="arrow-btn position-absolute top-50 end-0 translate-middle-y"
            onClick={handleNext}
          >
            <i className="bi bi-arrow-right-square"></i>
          </button>
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