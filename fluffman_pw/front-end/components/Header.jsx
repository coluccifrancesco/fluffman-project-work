import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="position-sticky top-0 z-2 w-100">
      <div className="upper-header d-flex justify-content-center align-items-center">
        <p className="m-0 p-1">
          Spedizione gratuita a partire da €19,99{" "}
          <i className="fa-solid fa-truck-fast ps-2"></i>
        </p>
      </div>

      <nav className="w-100 px-4 py-3 d-flex justify-content-between align-items-center bg-body-tertiary">
        <div>
          {/* Logo pagina estesa */}
          <Link to={"/"}>
            <img
              src="Logo3.png"
              className="header-logo-fromLg d-none d-lg-block"
            />
          </Link>

          {/* Logo pagina ridotta */}
          <Link to={"/"}>
            <img
              src="Logo1.png"
              className="header-logo-belowLg d-block d-lg-none"
            />
          </Link>
        </div>

        {/* Voci menù */}
        <ul className="d-none d-lg-flex list-unstyled m-0 gap-4 align-items-center">
          <li>
            <Link style={{ textDecoration: "none" }}>
              <p className="m-0">Prodotti</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }}>
              <p className="m-0">Cane</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }}>
              <p className="m-0">Gatto</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }}>
              <p className="m-0">Altri animali</p>
            </Link>
          </li>
          <li>
            <Link>
              <button
                type="button"
                className="search-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Cerca
              </button>
            </Link>
          </li>
          <li>
            <Link>
              <i className="fa-solid fa-star m-0"></i>
            </Link>
          </li>
          <li>
            <Link>
              <i className="fa-solid fa-cart-shopping m-0"></i>
            </Link>
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
          <i class="fa-solid fa-bars"></i>
        </button>
        <button
          className="offcanvas-btn d-block d-sm-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <i class="fa-solid fa-ellipsis-vertical"></i>
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
            <Link to={"/"}>
              <img
                src="DogFaceLogo.png"
                className="header-logo-belowLg d-block d-lg-none"
                id="offcanvasScrollingLabel"
              />
            </Link>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          {/* Voci menù */}
          <div className="offcanvas-body px-4">
            <ul className="list-unstyled m-0">
              <li className="py-2">
                <Link style={{ textDecoration: "none" }}>
                  <p className="m-0">Prodotti</p>
                </Link>
              </li>
              <li className="py-2">
                <Link style={{ textDecoration: "none" }}>
                  <p className="m-0">Cane</p>
                </Link>
              </li>
              <li className="py-2">
                <Link style={{ textDecoration: "none" }}>
                  <p className="m-0">Gatto</p>
                </Link>
              </li>
              <li className="py-2">
                <Link style={{ textDecoration: "none" }}>
                  <p className="m-0">Altri animali</p>
                </Link>
              </li>
              <li className="py-2">
                <Link style={{ textDecoration: "none" }}>
                  <p
                    type="button"
                    className="m-0"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Cerca
                  </p>
                </Link>
              </li>
              <li className="py-2">
                <Link style={{ textDecoration: "none" }}></Link>
                <p className="m-0">Wishlist</p>
              </li>
              <li className="py-2">
                <Link>
                  <i className="fa-solid fa-cart-shopping m-0"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
