import CardItem from "../components/CardComponent/CardItem";
import { useState, useEffect } from "react";

export default function WishlistPage() {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Simula i prodotti nella wishlist (sostituisci con dati reali dal backend se/quando disponibili)
    const simulatedWishlistIds = [1, 5, 10, 15, 20, 25];

    useEffect(() => {
        async function fetchData() {
            try {
                const productsResponse = await fetch("http://localhost:3030/api/products");
                const productsData = await productsResponse.json();

                const imagesResponse = await fetch("http://localhost:3030/api/images");
                const imagesData = await imagesResponse.json();

                // Combina i dati e filtra solo i prodotti della wishlist
                const wishlistData = productsData
                    .filter(p => simulatedWishlistIds.includes(p.id))
                    .map(p => {
                        const img = imagesData.find(i => i.product_id === p.id);
                        const imageUrl = img ? `http://localhost:3030/products_image/${img?.name}` : "/images/default.jpg";
                        return {
                            ...p,
                            image: imageUrl,
                        };
                    });

                setWishlistProducts(wishlistData);
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [simulatedWishlistIds]);

    if (isLoading) {
        return <div className="text-center mt-5">Caricamento in corso...</div>;
    }

    return (
        <div className="wishlist-page container p-2">
            <div className="m-2 p-2 text-center">
                <h1>La tua lista dei desideri</h1>
                <p className="text-success">
                    Qui trovi tutti i prodotti che hai salvato per un acquisto futuro.
                </p>
            </div>

            {wishlistProducts.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {wishlistProducts.map((product) => (
                        <div className="col" key={product.id}>
                            <CardItem product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-5">
                    <p className="text-light">La tua lista dei desideri è vuota.</p>
                </div>
            )}
        </div>
    );
}
