import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";

export default function ThankYouPage() {
    const location = useLocation();
    const orderSummary = location.state?.orderSummary;

    // Aggiungi questo controllo per gestire il caso in cui la pagina venga visitata direttamente
    if (!orderSummary) {
        return (
            <div className="container mt-5 p-3 text-center">
                <h2>Riepilogo non disponibile</h2>
                <p>Non è stato possibile caricare il riepilogo del tuo ordine.</p>
                <Link to="/">
                    <button className="btn btn-secondary mt-3">Torna alla Home</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4 text-dark fw-bold">Grazie per averci scelto!</h1>
            <p className="text-center text-muted">Il tuo ordine è stato ricevuto con successo.</p>

            <div className="container border rounded-4 shadow-sm p-4 mt-5">
                <h3 className="recap-title mb-4">Riepilogo del tuo acquisto</h3>

                <div className="recap-info">
                    <p className="fw-bold mb-2 text-dark">Prodotti:</p>
                    <ul className="list-unstyled">
                        {orderSummary.products.map((product) => (
                            <li key={product.id} className="d-flex justify-content-between mb-2">
                                <div className="d-flex align-items-center">
                                    <span className="fw-bold">{product.name}</span>
                                    <span className="ms-2 text-muted">({product.currentQuantity}x)</span>
                                </div>
                                <span className="text-dark fw-bold">
                                    <FontAwesomeIcon icon={faEuroSign} />
                                    {(product.price * product.currentQuantity).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-3" />

                    <div className="d-flex justify-content-between mb-2">
                        <p className="text-dark mb-0">Costo di spedizione:</p>
                        <span className="text-dark fw-bold">
                            <FontAwesomeIcon icon={faEuroSign} />
                            {orderSummary.shippingCost.toFixed(2)}
                        </span>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="text-dark fw-bold mb-0">Totale ordine:</p>
                        <span className="total-price fw-bold text-success fs-5">
                            <FontAwesomeIcon icon={faEuroSign} />
                            {orderSummary.totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <Link to="/">
                    <button className="btn btn-lg btn-secondary">Torna alla Home</button>
                </Link>
            </div>
        </div>
    );
}