import { useState, useEffect } from "react";
import "../styles/CheckOutPage.css";

export default function CheckOutPage() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartlist")) || [];
  });
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Stato per la visualizzazione dell'indirizzo di consegna
  const [showAddress, setShowAddress] = useState(false);

  //state per l'accordion
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Fetch dei dati del prodotto in base agli elementi nel carrello
  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await fetch(
          "http://localhost:3030/api/products"
        );
        const productsData = await productsResponse.json();

        const BASE_URL = "http://localhost:3030";

        const cartListData = cartItems
          .map((item) => {
            const product = productsData.find((p) => p?.id === item?.id);
            if (!product) return null;

            // Gestione robusta dell'URL delle immagini
            let imageUrl = null;
            if (product?.image_path) {
              let cleanPath = product.image_path.trim();
              const baseUrlPattern = "http://localhost:3030/api/images/";
              if (cleanPath.includes(baseUrlPattern)) {
                const lastIndex = cleanPath.lastIndexOf(baseUrlPattern);
                if (lastIndex > 0) {
                  cleanPath = cleanPath.substring(lastIndex);
                }
              }
              if (
                cleanPath.startsWith("http://") ||
                cleanPath.startsWith("https://")
              ) {
                imageUrl = cleanPath;
              } else if (cleanPath.startsWith("/api/images/")) {
                imageUrl = `${BASE_URL}${cleanPath}`;
              } else {
                imageUrl = `${BASE_URL}/products_image/${cleanPath}`;
              }
            }

            return {
              ...product,
              image: imageUrl,
              currentQuantity: item.quantity,
              availableQuantity: product.quantity,
              price: parseFloat(product.price),
            };
          })
          .filter(Boolean);

        setCartProducts(cartListData);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
      }
    }
    fetchData();
  }, [cartItems]);

  // Calcola il totale ogni volta che la lista dei prodotti cambia
  useEffect(() => {
    const subtotal = cartProducts.reduce(
      (sum, product) => sum + product.price * product.currentQuantity,
      0
    );
    const SHIPPING_THRESHOLD = 19.99;
    const SHIPPING_COST = 3.99;
    let shippingCost = 0;

    if (subtotal > 0 && subtotal < SHIPPING_THRESHOLD) {
      shippingCost = SHIPPING_COST;
    }
    const finalTotal = subtotal + shippingCost;
    setTotalPrice(finalTotal);
  }, [cartProducts]);

  const handleClick = () => {
    //  Simulazione di acquisto con dati reali
    const customerEmail = "utente@email.com";
    const orderDetails = {
      products: cartProducts.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: p.currentQuantity,
        price: p.price,
      })),
      totalPrice: totalPrice,
    };

    sendConfirmationEmail(customerEmail, orderDetails);
    notifySeller("seller@email.com", orderDetails);

    // Cancella il carrello dopo un acquisto simulato
    //   setCartItems([]);
    //   localStorage.removeItem("cartlist");
  };

  const sendConfirmationEmail = (customerEmail, orderDetails) => {
    console.log(`Invio mail di conferma al cliente: ${customerEmail}`);
    console.log("Dettagli ordine:", orderDetails);
  };

  const notifySeller = (sellerEmail, orderDetails) => {
    console.log(`Notifica di vendita a: ${sellerEmail}`);
    console.log("Dettagli Ordine:", orderDetails);
  };

  // Funzione per gestire il toggle dell'accordion
  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (
    <>
      <div className="container mt-3 ">
        <h1 className="mb-4 text-center">Checkout</h1>
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
            <div className="order-details-summary p-4">
              {cartProducts.length > 0 ? (
                <>
                  {cartProducts.map((product) => (
                    <div
                      key={product.id}
                      className="d-flex justify-content-between my-2"
                    >
                      <span>
                        {product.name} x {product.currentQuantity}
                      </span>
                      <span>
                        €{(product.price * product.currentQuantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Costo spedizione:</span>
                    <span>
                      €
                      {(
                        totalPrice -
                        cartProducts.reduce(
                          (sum, product) =>
                            sum + product.price * product.currentQuantity,
                          0
                        )
                      ).toFixed(2)}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold fs-5">
                    <span>Totale:</span>
                    <span>€{totalPrice.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <p className="text-center">Il carrello è vuoto.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* ACCORDION */}
      <div
        className="accordion accordion-flush container mt-3 border border-dark"
        id="accordionFlushExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${
                isAccordionOpen ? "" : "collapsed"
              }`}
              type="button"
              onClick={handleAccordionToggle}
              aria-expanded={isAccordionOpen}
              aria-controls="flush-collapseOne"
            >
              Aggiungi una carta per il pagamento
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className={`accordion-collapse collapse ${
              isAccordionOpen ? "show" : ""
            }`}
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

      {cartProducts.length > 0 && (
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
      )}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                {cartProducts.map((p) => (
                  <li key={p.id} className="text-dark">
                    {p.name} {p.currentQuantity}x
                  </li>
                ))}
              </ul>
              <p className="text-dark">
                Costo di spedizione: €
                {(
                  totalPrice -
                  cartProducts.reduce(
                    (sum, product) =>
                      sum + product.price * product.currentQuantity,
                    0
                  )
                ).toFixed(2)}
              </p>
              <p className="text-dark fw-bold">
                Totale: €{totalPrice.toFixed(2)}
              </p>
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
