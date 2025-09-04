import "../styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container py-3">
          <div className="row pt-3">
            <div className="col">
              <ul className="list-unstyled">
                <h5>
                  Quick links{" "}
                  <i className="fa-solid fa-arrow-up-right-from-square ps-2"></i>
                </h5>
                <li className="unstyled">
                  <Link>Chi Siamo</Link>
                </li>
                <li className="unstyled">
                  <Link>Cookies</Link>
                </li>
                <li className="unstyled">
                  <Link>Privacy</Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <h5>
                  Spedizioni <i className="fa-solid fa-truck-fast ps-2"></i>
                </h5>
                <li className="unstyled">
                  <Link>Condizioni e Costi di Spedizione</Link>
                </li>
                <li className="unstyled">
                  <Link>Termini e Condizioni di servizio</Link>
                </li>
                <li className="unstyled">
                  <Link>Informativa Rimborsi</Link>
                </li>
              </ul>
            </div>
            <div className="col">
              <img
                className="footer_pic mw-50 img-fluid"
                src="/happy_dog.jpg"
                alt="footer_dog_happy"
              />
            </div>
            <div className="col m-5 text-dark">
              <em>
                <strong>
                  Scopri il nuovo modo di vivere la cura del tuo animale da
                  compagnia. Con Fluffman avrai il segreto della sua felicità a
                  portata di zampa!
                </strong>{" "}
                <i className="fa-solid fa-paw"></i>
              </em>
            </div>
          </div>
        </div>
      </footer>
      <div className="pt-3 d-flex align-content-center justify-content-center copyright">
        <p>© 2023 Fluffman. All rights reserved.</p>
      </div>
    </>
  );
}
