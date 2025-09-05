import CardItem from "./CardComponent/CardItem";
import { useState, useEffect } from "react";
import "../styles/SuggestedProducts.css";

const products = [
  {
    id: 1,
    title: "Prodotto 1",
    price: 10.99,
    image: "product1.webp",
  },
  {
    id: 2,
    title: "Prodotto 2",
    price: 12.99,
    image: "product2.webp",
  },
  {
    id: 3,
    title: "Prodotto 3",
    price: 15.99,
    image: "product3.webp",
  },
  {
    id: 4,
    title: "Prodotto 4",
    price: 18.99,
    image: "product4.webp",
  },
  {
    id: 5,
    title: "Prodotto 5",
    price: 21.99,
    image: "product5.webp",
  },
  {
    id: 6,
    title: "Prodotto 6",
    price: 24.99,
    image: "product6.webp",
  },
  {
    id: 7,
    title: "Prodotto 7",
    price: 27.99,
    image: "product7.webp",
  },
  {
    id: 8,
    title: "Prodotto 8",
    price: 30.99,
    image: "product8.webp",
  },
];

export default function NewProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // useState per index in desktop
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); //set windowWidth useState for dynamic rendering

  // useEffect per cambiare logica in atto al cambio di finestra
  useEffect(() => {
    function handleSize() {
      setWindowWidth(window.innerWidth); //breakpoint bootstrap per modalità tablet
    }
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []); //debugging

  //DYNAMIC CARD RENDERING SECTION per tablet e desktop
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
        // se diverso da mobile => index arrows
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
                <CardItem
                  title={product.title}
                  image={product.image}
                  price={product.price}
                />
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
        // NON TOCCARE O SI SPACCA
        // if (mobile) => scroll orizzontale con overflow-auto
        <div className="d-flex overflow-auto gap-3 pb-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0" //impedisce alla card di restringersi, se mettete a flex-shrink-1 torna al comportamento di default
              style={{ width: "80%", maxWidth: "250px" }} //forziamo lo stile, testing purpose
            >
              <CardItem
                title={product.title}
                image={product.image}
                price={product.price}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
