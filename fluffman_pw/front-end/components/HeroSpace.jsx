
import React, { useState, useEffect } from 'react';

export default function carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const slides = [
        {
            image: "image1.jpg",
            caption: "Cane"
        },
        {
            image: "image2.jpg",
            caption: "Gatto"
        },
        {
            image: "image3.jpg",
            caption: "Criceto"
        },
        {
            image: "image4.jpg",
            caption: "Pesce Rosso"
        },
        {
            image: "image5.jpg",
            caption: "Pappagallo"
        },
    ];

    useEffect(() => {
        if (isLocked) return;

        setAutoSlide();
    }, [isLocked]);

    const setAutoSlide = () => {
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Cambia ogni 3 secondi (3000ms)
    };

    const toggleSlide = () => {
        setIsLocked(true); // Impedisce scorrimenti multipli
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setTimeout(() => { setIsLocked(false); }, 50); // Rilascia il blocco dopo un breve periodo
    };

    return (
        <div className="carosello">
            <div className="slide" onClick={toggleSlide}>
                <img src={slides[currentIndex].image} alt={slides[currentIndex].image} />
                <div className="caption">{slides[currentIndex].caption}</div>
            </div>
        </div>
    );
}