import { useEffect, useState } from "react";
import CardItem from "../components/CardComponent/CardItem";
import "../styles/ProductPages.css";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Aggiungi lo stato per la wishlist, leggendo dal localStorage
  const [wishlistIds, setWishlistIds] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  // Salva la wishlist nel localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Aggiungi la funzione per aggiungere/rimuovere un prodotto dai preferiti
  const onToggleFavorite = (productId) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds(wishlistIds.filter((id) => id !== productId));
    } else {
      setWishlistIds([...wishlistIds, productId]);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3030/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento dei prodotti.");
        }
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getFilteredProducts = () => {
    switch (filter) {
      case "dogs":
        return allProducts.filter((p) => p.animal_id === 1);
      case "cats":
        return allProducts.filter((p) => p.animal_id === 2);
      case "fish":
        return allProducts.filter((p) => p.animal_id === 3);
      case "rodents":
        return allProducts.filter((p) => p.animal_id === 4);
      case "birds":
        return allProducts.filter((p) => p.animal_id === 5);
      default:
        return allProducts;
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Caricamento...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Errore: {error}</div>;
  }

  return (
    <div className="hp_bg">
      <div className="p-3">
        <div className="container my-4">
          <div className="text-start ">
            <select
              name="select-pet"
              id="select-pet"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="select-pet  w-auto mx-auto"
              style={{ display: "inline-block" }}
            >
              <option value="all">Tutti i Prodotti</option>
              <option value="dogs">Cani</option>
              <option value="cats">Gatti</option>
              <option value="fish">Pesci</option>
              <option value="rodents">Roditori</option>
              <option value="birds">Uccelli</option>
            </select>
          </div>
          <h1 className="text-center my-5">Il nostro listino prodotti</h1>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {getFilteredProducts().map((product) => (
              <div key={product.id} className="col">
                <CardItem
                  product={product}
                  isFavorite={wishlistIds.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}