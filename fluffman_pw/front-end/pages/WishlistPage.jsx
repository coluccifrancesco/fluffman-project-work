
import { Link } from "react-router-dom";
import CardItem from "../components/CardComponent/CardItem";
import { useState, useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";



export default function WishlistPage() {
    const { wishlist, toggleWishlist } = useWishlist();
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const productsResponse = await fetch("http://localhost:3030/api/products");
                const productsData = await productsResponse.json();

                const imagesResponse = await fetch("http://localhost:3030/api/images");
                const imagesData = await imagesResponse.json();

                // Prendi solo gli id dalla wishlist del context
                const wishlistIds = wishlist.map(item => item.id);

                // Combina i dati e filtra solo i prodotti della wishlist
                const wishlistData = productsData
                    .filter(p => wishlistIds.includes(p.id))
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
    }, [wishlist]);

    if (isLoading) {
        return <div className="text-center mt-5">Caricamento in corso...</div>;
    }

    return (
        <div className="wishlist-page container p-2">
            <div className="m-2 p-2 text-center">
                <h1>La tua lista dei desideri</h1>
                <p className="text-success my-4">
                    Qui trovi tutti i prodotti che hai salvato per un acquisto futuro.
                </p>
            </div>

            {wishlistProducts.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {wishlistProducts.map((product) => (
                        <div className="col" key={product.id}>
                            <CardItem
                                key={product.id}
                                product={product}
                                isFavorite={wishlist.some(item => item.id === product.id)}
                                onToggleFavorite={toggleWishlist}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-5">
                    <p className="text-danger">La tua lista dei desideri è vuota.</p>
                    <Link to="/products"><button className="btn btn-info text-black my-5">Visualizza i nostri prodotti</button></Link>
                </div>
            )}
        </div>
    );
}