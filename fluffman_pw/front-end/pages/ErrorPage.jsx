import "../styles/HomePage.css";
import { Link } from "react-router-dom";

export default function Error404Page() {
    return (
        <div className="hp_bg d-flex align-items-center justify-content-center text-center p-5">
            <div className="container">
                <h1 className="display-1 fw-bold">404</h1>
                <h2 className="mb-4">Oops! Pagina non trovata.</h2>
                <p className="fs-5 mb-5 text-black">
                    Sembra che la pagina che stai cercando non esista o sia stata spostata.
                </p>
                <Link to="/" className="btn btn-outline-danger btn-lg">
                    Torna alla Homepage
                </Link>
            </div>
        </div>
    );
}