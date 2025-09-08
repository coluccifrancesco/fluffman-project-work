import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Ricerca eseguita: " + searchValue);
  };

  useEffect(() => {
    console.log("Ricerca aggiornata: " + searchValue);
  }, [searchValue]);

  return (
    <header className="position-sticky top-0 w-100">
      {/* Sezione spedizione gratuita */}
      <div className="upper-header d-flex justify-content-center align-items-center">
        <p className="m-0 p-1 text-light">
          Spedizione gratuita a partire da €19,99{" "}
          <i className="fa-solid fa-truck-fast ps-2 text-light"></i>
        </p>
      </div>

      {/* Header navbar */}
      <nav className="w-100 px-5 py-3 d-flex justify-content-between align-items-center bg-body-tertiary">
        {/* Loghi */}
        <div>
          {/* Pagina estesa */}
          <Link to="/">
            <img
              src="/Logo3.png"
              className="header-logo-fromLg d-none d-lg-block"
            />
          </Link>

          {/* Pagina ridotta */}
          <Link to="/">
            <img
              src="/Logo1.png"
              className="header-logo-belowLg d-block d-lg-none"
            />
          </Link>
        </div>

        {/* Voci menù */}
        <ul className="d-none d-lg-flex list-unstyled m-0 gap-4 align-items-center nav-list-desktop">
          <li>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <p className="m-0">Prodotti</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/DogProducts" style={{ textDecoration: "none" }}>
              <p className="m-0">Cane</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/CatProducts" style={{ textDecoration: "none" }}>
              <p className="m-0">Gatto</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/OtherAnimalProducts"
              style={{ textDecoration: "none" }}
            >
              <p className="m-0">Altri animali</p>
            </NavLink>
          </li>
          <li>
            <button
              className="p-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasTop"
              aria-controls="offcanvasTop"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </li>
          <li>
            <NavLink to="/Wishlist">
              <i className="fa-solid fa-star m-0"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/cart"}>
              <i className="fa-solid fa-cart-shopping m-0"></i>
            </NavLink>
          </li>
        </ul>

        {/* Offcanvas ricerca */}
        <div
          className="offcanvas offcanvas-top p-4"
          tabIndex="-1"
          id="offcanvasTop"
          aria-labelledby="offcanvasTopLabel"
        >
          <div className="offcanvas-header p-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="gap-3 d-flex justify-content-center align-items-center flex-column">
            <label htmlFor="searchBar">
              <h1 className="p-2 search-title">Ricerca prodotti</h1>
            </label>

            <form
              className="search-bar d-flex justify-content-between align-items-center"
              onSubmit={handleSubmit}
            >
              <input
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                id="searchBar"
                type="text"
                className="input-bar"
              />

              <button className="form-button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Elementi nav tablet-mobile */}
        <div className="d-lg-none d-flex jsutify-content-center align-items-center gap-3">
          {/* Bottone ricerca (mobile - tablet) */}
          <button
            className="d-block d-lg-none offcanvas-btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* Offcanvas con relativi tipi di bottoni: uno tablet e uno mobile */}
          <button
            className="offcanvas-btn d-none d-sm-block d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <button
            className="offcanvas-btn d-block d-sm-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>

          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div className="offcanvas-header">
              <NavLink to="/">
                <img
                  src="DogFaceLogo.png"
                  className="header-logo-belowLg d-block d-lg-none"
                  id="offcanvasScrollingLabel"
                />
              </NavLink>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            {/* Voci menù */}
            <div className="offcanvas-body px-4 bg-light">
              <ul className="list-unstyled m-0">
                <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                  <NavLink to="/" style={{ textDecoration: "none" }}>
                    <p className="m-0">Prodotti</p>
                  </NavLink>
                </li>

                <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                  <NavLink to="/DogProducts" style={{ textDecoration: "none" }}>
                    <p className="m-0">Cane</p>
                  </NavLink>
                </li>

                <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                  <NavLink to="/CatProducts" style={{ textDecoration: "none" }}>
                    <p className="m-0">Gatto</p>
                  </NavLink>
                </li>

                <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                  <NavLink
                    to="/OtherAnimalProducts"
                    style={{ textDecoration: "none" }}
                  >
                    <p className="m-0">Altri animali</p>
                  </NavLink>
                </li>

                <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                  <NavLink style={{ textDecoration: "none" }}>
                    <p className="m-0">Wishlist</p>
                  </NavLink>
                </li>

                <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                  <NavLink to={"/cart"}>
                    <i className="fa-solid fa-cart-shopping m-0"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
