import "../styles/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container p-3">
          <div className="row pt-3">
            <div className="col">
              <ul className="list-unstyled">
                <h4>Quick links</h4>
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
              <img
                className="mw-50 img-fluid p-3"
                src="/happy_dog.jpg"
                alt="footer_dog_happy"
              />
            </div>
            <div className="col p-3 m-5 text-dark">
              <em>
                <strong>
                  Scopri il nuovo modo di vivere la cura del tuo animale da
                  compagnia. Con Fluffman avrai il segreto della sua felicità a
                  portata di zampa!
                </strong>
              </em>
            </div>
          </div>
        </div>
      </footer>
      <div className="pt-3 d-flex align-content-center justify-content-center text-light copyright">
        <p>© 2023 Fluffman. All rights reserved.</p>
      </div>
    </>
  );
}
