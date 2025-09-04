import CardItem from "./CardComponent/CardItem";
import { useState } from "react";

const products = [
    {
        id: 1,
        title: "Prodotto 1",
        price: 10.99,
        image: "product1.webp"
    },
    {
        id: 2,
        title: "Prodotto 2",
        price: 12.99,
        image: "product2.webp"
    },
    {
        id: 3,
        title: "Prodotto 3",
        price: 15.99,
        image: "product3.webp"
    },
    {
        id: 4,
        title: "Prodotto 4",
        price: 18.99,
        image: "product4.webp"
    },
    {
        id: 5,
        title: "Prodotto 5",
        price: 21.99,
        image: "product5.webp"
    },
    {
        id: 6,
        title: "Prodotto 6",
        price: 24.99,
        image: "product6.webp"
    },
];

export default function NewProducts() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const cardsPerPage = 4;
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
            <button id="arrow_left" className="btn btn-light " onClick={handlePrev}><i className="bi bi-arrow-left-square-fill"></i></button>
            <h2 className="my-4">Ultimi Arrivi</h2>
            <div className="row justify-content-space-between g-4">
                {visibleProducts.map((product) => (
                    <CardItem
                        key={product.id}
                        title={product.title}
                        image={product.image}
                        price={product.price}
                    />
                ))}
            </div>
            <button id="arrow_right" className="btn btn-light " onClick={handleNext}><i className="bi bi-arrow-right-square-fill"></i></button>
        </div>
    );
}
