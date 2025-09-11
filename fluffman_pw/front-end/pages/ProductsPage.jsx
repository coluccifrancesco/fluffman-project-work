import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardItem from "../components/CardComponent/CardItem";
import "../styles/ProductPages.css";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const [searchParams, setSearchParams] = useSearchParams();

  // Usa context per wishlist e carrello
  // const { wishlist } = useWishlist();
  // const { cart } = useCart();

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

  if (loading) return <div className="text-center mt-5">Caricamento...</div>;
  if (error)
    return <div className="text-center mt-5 text-danger">Errore: {error}</div>;

  return (
    <div className="hp_bg">
      <div className="p-3">
        <div className="container my-4">
          {/* Contenitore dei filtri a sinistra */}
          <div className="filters-container">
            {/* Sezione Filtri */}
            <div className="filters">
              <select
                value={filters.animal_id}
                onChange={(e) => updateFilter("animal_id", e.target.value)}
                className="select w-auto m-2"
              >
                <option value="all">Tutti i Prodotti</option>
                <option value="1">Cani</option>
                <option value="2">Gatti</option>
                <option value="3">Pesci</option>
                <option value="4">Roditori</option>
                <option value="5">Uccelli</option>
              </select>

              <select
                value={filters.brand_id}
                onChange={(e) => updateFilter("brand_id", e.target.value)}
                className="select w-auto m-2"
              >
                <option value="">Tutti i Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sezione Ordinamento a destra */}
          <div className="sorting">
            <select
              value={`${filters.sort_by}_${filters.sort_order}`}
              onChange={(e) => {
                const [by, order] = e.target.value.split("_");
                updateFilter("sort_by", by);
                updateFilter("sort_order", order);
              }}
              className="select w-auto"
            >
              <option value="id_ASC">Default</option>
              <option value="price_ASC">Prezzo crescente</option>
              <option value="price_DESC">Prezzo decrescente</option>
              <option value="name_ASC">Nome A-Z</option>
              <option value="name_DESC">Nome Z-A</option>
            </select>
          </div>

          <h1 className="text-center my-5">Il nostro listino prodotti</h1>
          {/* Toggle Griglia/Lista  */}
          <div className="view-toggle mb-3">
            <div className="toggles">
              {/* Bottone Griglia */}
              <div className="tooltip-wrapper">
                <button
                  className={`btn ${(viewMode === "grid", "btn-success")}`}
                  onClick={() => setViewMode("grid")}
                >
                  <i
                    className="fa-solid fa-image"
                    style={{ color: "white" }}
                  ></i>
                  <span className="tooltip-text">Griglia</span>
                </button>
              </div>

              {/* Bottone Lista */}
              <div className="tooltip-wrapper">
                <button
                  className={`btn ${(viewMode === "list", "btn-success")}`}
                  onClick={() => setViewMode("list")}
                >
                  <i
                    className="fa-solid fa-list"
                    style={{ color: "white" }}
                  ></i>
                  <span className="tooltip-text">Lista</span>
                </button>
              </div>
            </div>
            {/* CHECKBOX PRODOTTI SCONTATI */}
            <label
              className="m-2 d-flex align-items-center"
              style={{ gap: "6px" }}
            >
              <input
                type="checkbox"
                checked={filters.discount === "1"}
                onChange={(e) =>
                  updateFilter("discount", e.target.checked ? "1" : "")
                }
              />
              Solo Prodotti scontati
            </label>
          </div>
          {/* Prodotti */}
          {viewMode === "grid" ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {allProducts.map((product) => (
                <div key={product.id} className="col">
                  <CardItem product={product} />
                </div>
              ))}
            </div>
          ) : (
            <ul className="list-group">
              {allProducts.map((product) => (
                <li
                  key={product.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{product.name}</strong> <br />
                    <small className="text-muted">
                      {brands.find((b) => b.id === product.brand_id)?.name ||
                        "Senza brand"}
                    </small>
                  </div>
                  <span className="fw-bold">{product.price} €</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
