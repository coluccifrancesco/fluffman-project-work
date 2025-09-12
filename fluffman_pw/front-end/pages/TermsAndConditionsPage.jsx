import "../styles/TermsAndConditionsPage.css";
import { Link } from "react-router-dom";

export default function TermsAndConditionsPage() {
  return (
    <div className="terms-and-conditions-page py-5 hp_bg">
      <div className="content-container py-5">
        <h1 className="page-title">Termini e Condizioni di Servizio</h1>
        <p>
          Benvenuto nel nostro sito web. Se continui a navigare e a utilizzare
          questo sito web, accetti di rispettare e di essere vincolato dai
          seguenti termini e condizioni di utilizzo.
        </p>

        <h2>Utilizzo del sito web</h2>
        <p>
          Il contenuto di queste pagine è solo per tua informazione e uso
          generale. È soggetto a modifiche senza preavviso.
        </p>

        <h2>Diritto d'autore e Marchi</h2>
        <p>
          Questo sito web contiene materiale che è di nostra proprietà o
          concesso in licenza. Questo materiale include, ma non è limitato a, il
          design, il layout, l'aspetto, la grafica e le immagini. La
          riproduzione è vietata se non in conformità con l'avviso di copyright.
        </p>

        <p className="note">
          Per qualsiasi domanda, non esitare a{" "}
          <Link to="/contacts">contattarci</Link>.
        </p>
      </div>
    </div>
  );
}
