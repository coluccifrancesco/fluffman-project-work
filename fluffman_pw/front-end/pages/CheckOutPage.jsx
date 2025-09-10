import { useState, useEffect, useRef } from "react";

export default function CheckOutPage() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartlist")) || [];
  });
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showAddress, setShowAddress] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [purchaseSummary, setPurchaseSummary] = useState(null); // Nuovo stato per il riepilogo dell'acquisto

  const userNameRef = useRef(null);
  const userLastNameRef = useRef(null);
  const userMailRef = useRef(null);
  const userPhoneRef = useRef(null);

  const inputAddressRef = useRef(null);
  const inputAddress2Ref = useRef(null);
  const inputZipRef = useRef(null);
  const inputCityRef = useRef(null);
  const inputProvinceRef = useRef(null);
  const inputCountryRef = useRef(null);

  const deliveryAddressRef = useRef(null);
  const deliveryAddress2Ref = useRef(null);
  const deliveryZipRef = useRef(null);
  const deliveryCityRef = useRef(null);
  const deliveryProvinceRef = useRef(null);
  const deliveryCountryRef = useRef(null);


  const BASE_URL = "http://localhost:3030";

  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await fetch(`${BASE_URL}/api/products`);
        const productsData = await productsResponse.json();

        const cartListData = cartItems.map(item => {
          const product = productsData.find(p => p?.id === item?.id);
          if (!product) return null;

          let imageUrl = null;
          if (product?.image_path) {
            let cleanPath = product.image_path.trim();
            const baseUrlPattern = "/api/images/";
            if (cleanPath.includes(baseUrlPattern)) {
              cleanPath = cleanPath.split(baseUrlPattern)[1];
            }
            imageUrl = `${BASE_URL}/api/images/${cleanPath}`;
          }

          return {
            ...product,
            image: imageUrl,
            currentQuantity: item.quantity,
            availableQuantity: product.quantity,
            price: parseFloat(product.price)
          };
        }).filter(Boolean);

        setCartProducts(cartListData);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
      }
    }
    fetchData();
  }, [cartItems]);

  useEffect(() => {
    const subtotal = cartProducts.reduce((sum, product) => sum + (product.price * product.currentQuantity), 0);
    const SHIPPING_THRESHOLD = 19.99;
    const SHIPPING_COST = 3.99;
    let shippingCost = 0;

    if (subtotal > 0 && subtotal < SHIPPING_THRESHOLD) {
      shippingCost = SHIPPING_COST;
    }
    const finalTotal = subtotal + shippingCost;
    setTotalPrice(finalTotal);
  }, [cartProducts]);

  const handleOrder = async () => {
    const userEmail = userMailRef.current.value;
    const userName = userNameRef.current.value;
    const userLastName = userLastNameRef.current.value;
    const userPhone = userPhoneRef.current.value;

    const billingAddress = {
      address: inputAddressRef.current.value,
      address2: inputAddress2Ref.current.value,
      zip: inputZipRef.current.value,
      city: inputCityRef.current.value,
      province: inputProvinceRef.current.value,
      country: inputCountryRef.current.value,
    };

    const requiredFields = [
      userName,
      userLastName,
      userEmail,
      billingAddress.address,
      billingAddress.zip,
      billingAddress.city,
      billingAddress.province,
      billingAddress.country
    ];

    if (requiredFields.some(field => !field)) {
      setModalTitle("Attenzione");
      setModalMessage("Per favore, compila tutti i campi obbligatori dell'indirizzo di fatturazione.");
      const modalElement = document.getElementById('exampleModal');
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error("Bootstrap JS non caricato. Impossibile mostrare il modal.");
      }
      return;
    }

    const productListHtml = cartProducts.map(p => `
      <li>${p.name} (${p.currentQuantity}x) - €${(p.price * p.currentQuantity).toFixed(2)}</li>
    `).join('');

    const emailBody = `
      <h1>Riepilogo del tuo Ordine</h1>
      <p>Gentile ${userName},</p>
      <p>Il tuo ordine è stato ricevuto con successo. Di seguito trovi il riepilogo:</p>
      <ul>
        ${productListHtml}
      </ul>
      <p>Costo di spedizione: €${(totalPrice - cartProducts.reduce((sum, product) => sum + (product.price * product.currentQuantity), 0)).toFixed(2)}</p>
      <p><strong>Totale ordine: €${totalPrice.toFixed(2)}</strong></p>
      <p>Grazie per il tuo acquisto!</p>
    `;

    const orderData = {
      userEmail,
      userName,
      userLastName,
      userPhone,
      billingAddress,
      totalPrice,
      products: cartProducts.map(p => ({
        id: p.id,
        name: p.name,
        quantity: p.currentQuantity,
        price: p.price
      })),
    };

    if (showAddress) {
      orderData.deliveryAddress = {
        address: deliveryAddressRef.current.value,
        address2: deliveryAddress2Ref.current.value,
        zip: deliveryZipRef.current.value,
        city: deliveryCityRef.current.value,
        province: deliveryProvinceRef.current.value,
        country: deliveryCountryRef.current.value,
      };
    }

    console.log('Dati ordine da inviare:', JSON.stringify(orderData, null, 2));

    try {
      const emailResponse = await fetch(`${BASE_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          subject: "Conferma del tuo Ordine",
          body: emailBody,
        })
      });

      if (!emailResponse.ok) {
        console.error("Errore nell'invio dell'email. Stato HTTP:", emailResponse.status);
        const emailErrorData = await emailResponse.json();
        setModalTitle("Errore nell'invio dell'email");
        setModalMessage(`Si è verificato un errore: ${emailErrorData.message || 'Errore sconosciuto'}`);
        const modalElement = document.getElementById('exampleModal');
        if (window.bootstrap && window.bootstrap.Modal) {
          const modal = new window.bootstrap.Modal(modalElement);
          modal.show();
        } else {
          console.error("Bootstrap JS non caricato. Impossibile mostrare il modal.");
        }
        return;
      }
      const emailResult = await emailResponse.json();
      console.log('Risultato invio email:', emailResult);

      const purchaseResponse = await fetch(`${BASE_URL}/api/purchases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!purchaseResponse.ok) {
        console.error("Errore nel salvataggio dell'ordine. Stato HTTP:", purchaseResponse.status);
        const purchaseErrorData = await purchaseResponse.json();
        setModalTitle("Errore nel salvataggio dell'ordine");
        setModalMessage(`Si è verificato un errore: ${purchaseErrorData.message || 'Errore sconosciuto'}`);
        const modalElement = document.getElementById('exampleModal');
        if (window.bootstrap && window.bootstrap.Modal) {
          const modal = new window.bootstrap.Modal(modalElement);
          modal.show();
        } else {
          console.error("Bootstrap JS non caricato. Impossibile mostrare il modal.");
        }
        return;
      }
      const purchaseResult = await purchaseResponse.json();
      console.log('Risultato salvataggio ordine:', purchaseResult);

      // Salvo i dati dell'acquisto in un nuovo stato prima di svuotare il carrello
      const summary = {
        products: cartProducts,
        totalPrice: totalPrice,
        shippingCost: totalPrice - cartProducts.reduce((sum, product) => sum + (product.price * product.currentQuantity), 0)
      };
      setPurchaseSummary(summary);

      setModalTitle("Acquisto effettuato con successo");
      setModalMessage("Grazie per averci scelto, riceverai i tuoi prodotti entro 24/48h.");

      const modalElement = document.getElementById('exampleModal');
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error("Bootstrap JS non caricato. Impossibile mostrare il modal.");
      }

      setCartItems([]);
      localStorage.removeItem("cartlist");

    } catch (error) {
      console.error("Errore durante l'elaborazione dell'ordine:", error);
      setModalTitle("Errore Generale");
      setModalMessage("Si è verificato un errore durante l'ordine. Riprova più tardi.");
      const modalElement = document.getElementById('exampleModal');
      if (window.bootstrap && window.bootstrap.Modal) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      } else {
        console.error("Bootstrap JS non caricato. Impossibile mostrare il modal.");
      }
    }
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
                ref={userNameRef}
              />
              <label htmlFor="userLastName" className="form-label fs-5 mt-2">
                Cognome
              </label>
              <input
                type="text"
                className="form-control"
                id="userLastName"
                placeholder="Rossi"
                ref={userLastNameRef}
              />
              <label htmlFor="userMail" className="form-label fs-5 mt-2">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="userMail"
                placeholder="mariorossi@gmail.com"
                ref={userMailRef}
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
                  ref={userPhoneRef}
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
                ref={inputAddressRef}
              />
              <label htmlFor="inputAddress2" className="form-label fs-5 mt-2">
                Piano, appartamento o scala
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Es. Piano 2, Scala A"
                ref={inputAddress2Ref}
              />
              <label htmlFor="inputZip" className="form-label fs-5 mt-2">
                CAP
              </label>
              <input
                type="text"
                className="form-control"
                id="inputZip"
                placeholder="00100"
                ref={inputZipRef}
              />
              <label htmlFor="inputCity" className="form-label fs-5 mt-2">
                Città
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                placeholder="Roma"
                ref={inputCityRef}
              />
              <label htmlFor="inputProvince" className="form-label fs-5 mt-2">
                Provincia
              </label>
              <input
                type="text"
                className="form-control"
                id="inputProvince"
                placeholder="RM"
                ref={inputProvinceRef}
              />
              <label htmlFor="inputCountry" className="form-label fs-5 mt-2">
                Nazione
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCountry"
                placeholder="Italia"
                ref={inputCountryRef}
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
                    htmlFor="deliveryAddress"
                    className="form-label fs-5 mt-3"
                  >
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deliveryAddress"
                    placeholder="Via Roma n.1"
                    ref={deliveryAddressRef}
                  />
                  <label
                    htmlFor="deliveryAddress2"
                    className="form-label fs-5 mt-2"
                  >
                    Piano, appartamento o scala
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deliveryAddress2"
                    placeholder="Es. Piano 2, Scala A"
                    ref={deliveryAddress2Ref}
                  />
                  <label htmlFor="deliveryZip" className="form-label fs-5 mt-2">
                    CAP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deliveryZip"
                    placeholder="00100"
                    ref={deliveryZipRef}
                  />
                  <label htmlFor="deliveryCity" className="form-label fs-5 mt-2">
                    Città
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deliveryCity"
                    placeholder="Roma"
                    ref={deliveryCityRef}
                  />
                  <label
                    html-for="deliveryProvince"
                    className="form-label fs-5 mt-2"
                  >
                    Provincia
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deliveryProvince"
                    placeholder="RM"
                    ref={deliveryProvinceRef}
                  />
                  <label
                    html-for="deliveryCountry"
                    className="form-label fs-5 mt-2"
                  >
                    Nazione
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="deliveryCountry"
                    placeholder="Italia"
                    ref={deliveryCountryRef}
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
                    <div key={product.id} className="d-flex justify-content-between my-2">
                      <span>{product.name} x {product.currentQuantity}</span>
                      <span>€{(product.price * product.currentQuantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Costo spedizione:</span>
                    <span>€{(totalPrice - cartProducts.reduce((sum, product) => sum + (product.price * product.currentQuantity), 0)).toFixed(2)}</span>
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
      <div
        className="accordion accordion-flush container mt-3 border border-dark"
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

      {cartProducts.length > 0 && (
        <div className="container mt-3 col-12 text-center">
          <button
            onClick={handleOrder}
            type="submit"
            className="btn btn-success btn-lg"
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
                {modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-dark">{modalMessage}</p>
              {modalTitle === "Acquisto effettuato con successo" && purchaseSummary && (
                <>
                  <p className="text-dark"> Hai acquistato i seguenti prodotti:</p>
                  <ul>
                    {purchaseSummary.products.map((p) => (
                      <li key={p.id} className="text-dark">
                        {p.name} {p.currentQuantity}x
                      </li>
                    ))}
                  </ul>
                  <p className="text-dark">
                    Costo di spedizione:{" "}
                    €{purchaseSummary.shippingCost.toFixed(2)}
                  </p>
                  <p className="text-dark fw-bold">Totale: €{purchaseSummary.totalPrice.toFixed(2)}</p>
                </>
              )}
            </div>
            <div className="modal-footer">
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
