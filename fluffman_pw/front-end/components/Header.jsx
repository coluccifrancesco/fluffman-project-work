import { NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="position-sticky top-0 z-2 w-100">
      <div className="upper-header d-flex justify-content-center align-items-center">
        <p className="m-0 p-1 text-light">
          Spedizione gratuita a partire da €19,99{" "}
          <i className="fa-solid fa-truck-fast ps-2 text-light"></i>
        </p>
      </div>

      <nav className="w-100 px-4 py-3 d-flex justify-content-between align-items-center bg-body-tertiary">
        <div>
          {/* Logo pagina estesa */}
          <NavLink to={"/"}>
            <img
              src="Logo3.png"
              className="header-logo-fromLg d-none d-lg-block"
            />
          </NavLink>

          {/* Logo pagina ridotta */}
          <NavLink to={"/"}>
            <img
              src="Logo1.png"
              className="header-logo-belowLg d-block d-lg-none"
            />
          </NavLink>
        </div>

        {/* Voci menù */}
        <ul className="d-none d-lg-flex list-unstyled m-0 gap-4 align-items-center">
          <li>
            <NavLink style={{ textDecoration: "none" }}>
              <p className="m-0">Prodotti</p>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }}>
              <p className="m-0">Cane</p>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }}>
              <p className="m-0">Gatto</p>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }}>
              <p className="m-0">Altri animali</p>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <button
                type="button"
                className="search-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Cerca
              </button>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <i className="fa-solid fa-star m-0"></i>
            </NavLink>
          </li>
          <li>
            <NavLink>
              <i className="fa-solid fa-cart-shopping m-0"></i>
            </NavLink>
          </li>
        </ul>

        {/* Modale DA AGGIUSTARE */}
        <div
          className="modal fade z-2"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

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
            <NavLink to={"/"}>
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
                <NavLink style={{ textDecoration: "none" }}>
                  <p className="m-0">Prodotti</p>
                </NavLink>
              </li>

              <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                <NavLink style={{ textDecoration: "none" }}>
                  <p className="m-0">Cane</p>
                </NavLink>
              </li>

              <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                <NavLink style={{ textDecoration: "none" }}>
                  <p className="m-0">Gatto</p>
                </NavLink>
              </li>

              <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                <NavLink style={{ textDecoration: "none" }}>
                  <p className="m-0">Altri animali</p>
                </NavLink>
              </li>

              <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                <NavLink style={{ textDecoration: "none" }}>
                  <p
                    type="button"
                    className="m-0"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Cerca
                  </p>
                </NavLink>
              </li>

              <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                <NavLink style={{ textDecoration: "none" }}>
                  <p className="m-0">Wishlist</p>
                </NavLink>
              </li>

              <li className="py-3 d-flex justify-content-center align-items-center offcanvas-item">
                <NavLink>
                  <i className="fa-solid fa-cart-shopping m-0"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
