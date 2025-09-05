import { useState, useEffect } from "react";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/carousel_img/cat_smol.jpg",
    },
    {
      image: "/carousel_img/border_c.jpg",
    },
    {
      image: "/carousel_img/wonder_dog.jpg",
    },
    {
      image: "/carousel_img/happy_maine.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); //interval 5s

    return () => clearInterval(interval); //clears interval
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="carosello" style={{ textAlign: "center" }}>
      <div className="slide" onClick={nextSlide}>
        <img
          className="img-fluid"
          src={slides[currentIndex].image}
          alt={`slide-${currentIndex}`}
          style={{
            minWidth: "100%",
            maxHeight: "600px",
            objectFit: "cover",
          }}
        />
        <div className="caption">{slides[currentIndex].caption}</div>
      </div>
    </div>
  );
}
