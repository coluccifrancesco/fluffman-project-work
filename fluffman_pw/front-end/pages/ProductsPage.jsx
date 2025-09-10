import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardItem from "../components/CardComponent/CardItem";
import "../styles/ProductPages.css";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // Stato del carrello aggiornato per gestire gli oggetti { id, quantity }
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartlist")) || [];
  });

  const [wishlistIds, setWishlistIds] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const [filters, setFilters] = useState({
    animal_id: searchParams.get("animal_id") || "all",
    brand_id: searchParams.get("brand_id") || "",
    sort_by: searchParams.get("sort_by") || "id",
    sort_order: searchParams.get("sort_order") || "ASC",
    discount: searchParams.get("discount") || "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    const newParams = new URLSearchParams(searchParams.toString());
    if (!value) newParams.delete(key);
    else newParams.set(key, value);
    setSearchParams(newParams, { replace: true });
  };

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if (filters.animal_id !== "all")
      query.append("animal_id", filters.animal_id);
    if (filters.brand_id) query.append("brand_id", filters.brand_id);
    if (filters.sort_by && filters.sort_by !== "id")
      query.append("sort_by", filters.sort_by);
    if (filters.sort_order) query.append("sort_order", filters.sort_order);
    if (filters.discount) query.append("discount", "1");

    fetch(`http://localhost:3030/api/products/search?${query.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento dei prodotti.");
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
  }, [filters]);

  useEffect(() => {
    fetch("http://localhost:3030/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Errore caricamento brand:", err));
  }, []);

  // Salva il carrello nel localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("cartlist", JSON.stringify(cartItems));
  }, [cartItems]);

  // Salva la wishlist nel localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Funzione di aggiunta/rimozione modificata per usare un array di oggetti
  const onToggleAddToCart = (productId) => {
    const existingProduct = cartItems.find((item) => item.id === productId);

    if (existingProduct) {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  const onToggleFavorite = (productId) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds(wishlistIds.filter((id) => id !== productId));
    } else {
      setWishlistIds([...wishlistIds, productId]);
    }
  };

  if (loading) return <div className="text-center mt-5">Caricamento...</div>;
  if (error)
    return <div className="text-center mt-5 text-danger">Errore: {error}</div>;

  return (
    <div className="hp_bg">
      <div className="p-3">
        <div className="container my-4">
          {/* FILTRI */}
          <div className="text-start d-flex gap-3 align-items-center flex-wrap">
            {/* Animal filter*/}
            <select
              value={filters.animal_id}
              onChange={(e) => {
                e.preventDefault();
                updateFilter("animal_id", e.target.value);
              }}
              className="select w-auto m-3"
            >
              <option value="all">Tutti i Prodotti</option>
              <option value="1">Cani</option>
              <option value="2">Gatti</option>
              <option value="3">Pesci</option>
              <option value="4">Roditori</option>
              <option value="5">Uccelli</option>
            </select>

            {/* Brand filter*/}
            <div
              className="m-1"
              style={{ maxHeight: "120px", overflowY: "auto" }}
            >
              <select
                value={filters.brand_id}
                onChange={(e) => {
                  e.preventDefault();
                  updateFilter("brand_id", e.target.value);
                }}
                className="select w-auto"
              >
                <option value="">Tutti i Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Ordinamento */}
            <select
              value={`${filters.sort_by}_${filters.sort_order}`}
              onChange={(e) => {
                {
                  e.preventDefault();
                  const [by, order] = e.target.value.split("_");
                  updateFilter("sort_by", by);
                  updateFilter("sort_order", order);
                }
              }}
              className="select w-auto m-3"
            >
              <option value="id_ASC">Default</option>
              <option value="price_ASC">Prezzo crescente</option>
              <option value="price_DESC">Prezzo decrescente</option>
              <option value="name_ASC">Nome A-Z</option>
              <option value="name_DESC">Nome Z-A</option>
            </select>

            {/* Checkbox Prodotti Scontati */}
            <label
              className="m-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <input
                type="checkbox"
                checked={filters.discount === "1"}
                onChange={(e) => {
                  e.preventDefault();
                  updateFilter("discount", e.target.checked ? "1" : "");
                }}
              />
              Solo Prodotti scontati
            </label>
          </div>

          <h1 className="text-center my-5">Il nostro listino prodotti</h1>

          {/* Prodotti */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {allProducts.map((product) => (
              <div key={product.id} className="col">
                <CardItem
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  // Passiamo gli ID al componente figlio per mantenere la compatibilità
                  cartListId={cartItems.map((item) => item.id)}
                  onToggleAddToCart={onToggleAddToCart}
                  isInCart={cartItems.some((item) => item.id === product.id)}
                  isFavorite={wishlistIds.includes(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
