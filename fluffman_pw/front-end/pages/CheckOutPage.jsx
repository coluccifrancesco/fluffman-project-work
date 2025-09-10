import { useState } from "react";

export default function CheckOutPage() {
  const handleClick = () => {
    //  Simulazione di acqusto
    const customerEmail = "utente@email.com";
    const orderDetails = {
      itemId: "123",
      quantity: 2,
    };

    sendConfirmationEmail(customerEmail, orderDetails);
    notifySeller("seller@email.com", orderDetails);
  };

  const sendConfirmationEmail = (customerEmail, orderDetails) => {
    console.log(`Invio mail di conferma al cliente: ${customerEmail}`);
    console.log(`Dettagli ordine: ${orderDetails}`);
  };

  const notifySeller = (sellerEmail, orderDetails) => {
    console.log(`Notifica di vendita: ${sellerEmail}`);
    console.log(`Dettagli Ordine: ${orderDetails}`);
  };

  const [showAddress, setShowAddress] = useState(false);

  return (
    <>
      <div className="container mt-3 ">
        <h1 className="mb-4">Checkout</h1>
        <br />
        <div className="row cart-row d-flex justify-content-between">
          <form className="col-md-7 g-3 d-flex flex-column">
            <div className="col-12">
              <h2 className="mb-1">Dati Personali</h2>
              <hr />
              <label htmlFor="userName" className="form-label fs-5 mt-3">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Mario"
              />
              <label htmlFor="userLastName" className="form-label fs-5 mt-2">
                Cognome
              </label>
              <input
                type="text"
                className="form-control"
                id="userLastName"
                placeholder="Rossi"
              />
              <label htmlFor="userMail" className="form-label fs-5 mt-2">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="userMail"
                placeholder="mariorossi@gmail.com"
              />
              <label htmlFor="userPhone" className="form-label fs-5 mt-2">
                Telefono
              </label>
              <div className="input-group">
                <span className="input-group-text" id="addon-wrapping">
                  +39{" "}
                </span>
                <input
                  type="tel"
                  className="form-control"
                  id="userPhone"
                  placeholder="123 456 7890"
                />
              </div>
            </div>

            <div className="col-12 mt-3">
              <h2 className="mb-4">Indirizzo di Fatturazione</h2>
              <label htmlFor="inputAddress" className="form-label">
                Indirizzo
              </label>
            </div>
            <div className="col-12">
              <h2 className="mb-1 mt-4">Indirizzo di Fatturazione</h2>
              <hr />
              <label htmlFor="inputAddress" className="form-label fs-5 mt-3">
                Indirizzo
              </label>

              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Via Roma n.1"
              />
              <label htmlFor="inputAddress2" className="form-label fs-5 mt-2">
                Piano, appartamento o scala
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Es. Piano 2, Scala A"
              />
              <label htmlFor="inputZip" className="form-label fs-5 mt-2">
                CAP
              </label>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                placeholder="00100"
              />
              <label htmlFor="inputCity" className="form-label fs-5 mt-2">
                Città
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                placeholder="Roma"
              />
              <label htmlFor="inputProvince" className="form-label fs-5 mt-2">
                Provincia
              </label>
              <input
                type="text"
                className="form-control"
                id="inputProvince"
                placeholder="RM"
              />
              <label htmlFor="inputCountry" className="form-label fs-5 mt-2">
                Nazione
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCountry"
                placeholder="Italia"
              />
            </div>
            <div className="col-12">
              <h2 className="mt-3">Indirizzo di Consegna</h2>

              <h2 className="mt-4 mb-1">Indirizzo di Consegna</h2>
              <hr />

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkChecked"
                  checked={showAddress}
                  onChange={() => setShowAddress(!showAddress)}
                />
                <label className="form-check-label" htmlFor="checkChecked">
                  Indirizzo di consegna diverso da quello di fatturazione
                </label>
              </div>
              {showAddress && (
                <>
                  <label
                    htmlFor="inputAddress"
                    className="form-label fs-5 mt-3"
                  >
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="Via Roma n.1"
                  />
                  <label
                    htmlFor="inputAddress2"
                    className="form-label fs-5 mt-2"
                  >
                    Piano, appartamento o scala
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress2"
                    placeholder="Es. Piano 2, Scala A"
                  />
                  <label htmlFor="inputZip" className="form-label fs-5 mt-2">
                    CAP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    placeholder="00100"
                  />
                  <label htmlFor="inputCity" className="form-label fs-5 mt-2">
                    Città
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    placeholder="Roma"
                  />
                  <label
                    htmlFor="inputProvince"
                    className="form-label fs-5 mt-2"
                  >
                    Provincia
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputProvince"
                    placeholder="RM"
                  />
                  <label
                    htmlFor="inputCountry"
                    className="form-label fs-5 mt-2"
                  >
                    Nazione
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCountry"
                    placeholder="Italia"
                  />
                </>
              )}
            </div>
          </form>
          <div className="col-md-4 cart-summary bg-light rounded g-3 p-0 d-flex flex-column">
            <div className="cart-summary-header rounded-3 col-12">
              <h2 className="p-5">Il tuo ordine</h2>
            </div>
          </div>
        </div>
      </div>

      <div
        className="accordion accordion-flush container mt-3 border border-dark rounded-4"
        id="accordionFlushExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Aggiungi una carta per il pagamento
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <form className="row g-3">
              <div className="col-md-12 mt-3">
                <label htmlFor="cardNumber" className="form-label">
                  Numero carta
                </label>
                <input type="text" className="form-control" id="cardNumber" />
              </div>
              <div className="col-md-6">
                <label htmlFor="expireDate" className="form-label">
                  Data di scadenza
                </label>
                <input type="text" className="form-control" id="expireDate" />
                <div className="form-text" id="basic-addon4">
                  Parte anteriore della carta in formato MM/YY
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="securityCode" className="form-label">
                  Codice di sicurezza
                </label>
                <input type="text" className="form-control" id="securityCode" />
                <div className="form-text" id="basic-addon4">
                  3 cifre sul retro della carta
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="cardOwner" className="form-label">
                  Nome del proprietario della carta
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardOwner"
                  placeholder="Mario Rossi"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* further logic to show btn only after form completion, create State to check Form data insertion */}
      <div className="container mt-3 col-12 text-center">
        <button
          onClick={handleClick}
          type="submit"
          className="btn btn-success btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Ordina e paga
        </button>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Acquisto effettuato con successo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-dark"> Hai acquistato i seguenti prodotti:</p>
              <ul>
                <li className="text-dark">Prodotto 1 2x</li>
                <li className="text-dark">Prodotto 2 1x</li>
                <li className="text-dark">Prodotto 3 4x</li>
              </ul>

              <p className="text-dark">Costo di spedizione</p>
              <p className="text-dark">Totale</p>
            </div>
            <div className="modal-footer">
              <p className="text-dark">
                Grazie per averci scelto, riceverai i tuoi prodotti entro 24/48h
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
