import "../styles/ShippingPolicyPage.css";
import { Link } from "react-router-dom";

export default function ShippingPolicyPage() {
    return (
        <div className="shipping-policy-page py-5">
            <div className="content-container py-5">
                <h1 className="page-title">Condizioni e Costi di Spedizione</h1>
                <p>
                    La spedizione dei nostri prodotti viene effettuata tramite corriere espresso.
                    I tempi di consegna sono generalmente di 24-48 ore lavorative per la maggior parte del territorio nazionale.
                </p>

                <h2>Costi di Spedizione</h2>
                <ul>
                    <li>Spedizione standard (24-48 ore): € 3,99</li>
                    <li>Spedizione gratuita per ordini superiori a € 19,99</li>
                </ul>

                <h2>Tempi di Elaborazione</h2>
                <p>
                    Gli ordini vengono elaborati e spediti entro 24 ore dal ricevimento del pagamento.
                    Riceverai un'email di conferma con il numero di tracciamento una volta che il pacco sarà affidato al corriere.
                </p>

                <p className="note">
                    Per maggiori dettagli, consulta la nostra pagina di <Link to="/privacy">Informativa sulla Privacy</Link>.
                </p>
            </div>
        </div>
    );
}