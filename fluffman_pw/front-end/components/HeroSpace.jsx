import { useState, useEffect } from "react";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/carousel_img/happy_dog.jpg",
    },
    {
      image: "/carousel_img/happy_cat.jpg",
    },
    {
      image: "/carousel_img/happy_sphinx.jpg",
    },
    {
      image: "/carousel_img/happy_rottie.jpg",
    },
    {
      image: "/carousel_img/happy_maine.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); //interval 3s

    return () => clearInterval(interval); //clears interval
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="carosello" style={{ textAlign: "center" }}>
      <div className="slide" onClick={nextSlide}>
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].caption}
          style={{
            width: "100rem",
            height: "500px",
            objectFit: "contain",
            overflow: "hidden",
          }}
        />
        <div className="caption">{slides[currentIndex].caption}</div>
      </div>
    </div>
  );
}
