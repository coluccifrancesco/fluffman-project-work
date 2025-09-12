import "../styles/RefundPolicyPage.css";
import { Link } from "react-router-dom";

export default function RefundPolicyPage() {
  return (
    <div className="refund-policy-page py-5 hp_bg">
      <div className="content-container py-5">
        <h1 className="page-title">Informativa Rimborsi</h1>
        <p>
          Ci auguriamo che tu sia soddisfatto del tuo acquisto. Tuttavia, se non
          lo sei, siamo qui per aiutarti.
        </p>

        <h2>Resi</h2>
        <p>
          Hai 14 giorni di calendario per restituire un articolo a partire dalla
          data in cui lo hai ricevuto. L'articolo deve essere inutilizzato e
          nelle stesse condizioni in cui lo hai ricevuto, con l'imballaggio
          originale.
        </p>

        <h2>Rimborsi</h2>
        <p>
          Una volta ricevuto il tuo articolo, lo ispezioneremo e ti informeremo
          che abbiamo ricevuto il tuo articolo restituito. Ti informeremo
          immediatamente sullo stato del tuo rimborso dopo aver ispezionato
          l'articolo.
        </p>
        <p>
          Se il tuo reso viene approvato, emetteremo un rimborso sulla tua carta
          di credito (o metodo di pagamento originale).
        </p>

        <p className="note">
          Per maggiori informazioni, consulta la nostra pagina{" "}
          <Link to="/privacy">sulla privacy</Link>.
        </p>
      </div>
    </div>
  );
}
