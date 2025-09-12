import "../styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="container-fluid">
        <div className="container py-3">
          <div className="row pt-3 justify-content-between">
            <div className="col-6 col-sm-3 col-xs-3 col-md-3">
              <ul className="list-unstyled">
                <h5>
                  Info Utili{" "}
                  <i className="fa-solid fa-arrow-up-right-from-square ps-2"></i>
                </h5>
                <li className="unstyled">
                  <Link to={'/stores'}>Indirizzi</Link>
                </li>
                <li className="unstyled">
                  <Link to={"/privacy"}>Privacy</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-3 col-xs-3 col-md-3">
              <ul className="list-unstyled">
                <h5>
                  Chi Siamo{" "}
                  <i className="fa-solid fa-arrow-up-right-from-square ps-2"></i>
                </h5>
                <li className="unstyled">
                  <Link to={"/aboutUs"}>Chi Siamo</Link>
                </li>
                <li className="unstyled">
                  <Link to="/Contacts">Contatti</Link>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm-3 col-xs-3 col-md-3">
              <ul className="list-unstyled">
                <h5>
                  Spedizioni <i className="fa-solid fa-truck-fast ps-2"></i>
                </h5>
                <li className="unstyled">
                  <Link to={'/shipping-policy'}>Condizioni e Costi di Spedizione</Link>
                </li>
                <li className="unstyled">
                  <Link to={'/terms-and-conditions'}>Termini e Condizioni di servizio</Link>
                </li>
                <li className="unstyled">
                  <Link to={"/refund-policy"}>Informativa Rimborsi</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 d-none d-lg-block">
              <img
                className="footer_pic mw-50 img-fluid"
                src="/happy_dog.jpg"
                alt="footer_dog_happy"
              />
            </div>
          </div>
        </div>
      </footer>
      <div className="pt-3 d-flex align-content-center justify-content-center copyright">
        <p>© 2025 Fluffman. All rights reserved.</p>
      </div>
    </>
  );
}
