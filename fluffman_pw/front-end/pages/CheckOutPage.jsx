import { useState, useEffect, useRef } from "react";
import "../styles/CheckOutPage.css";
import { useNavigate } from "react-router-dom";

// regex restrittiva (accetta solo .com .it .org .net .edu) - case insensitive
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.(com|it|org|net|edu)$/i;
// lista dei domini validi
export const VALID_DOMINIONS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "libero.it",
  "tiscali.it",
  "alice.it",
  "virgilio.it",
  "hotmail.it",
  "icloud.com",
  "protonmail.com",
  "mail.com",
  "zoho.com"
];


const CheckoutPage = () => {
  // Sposta useNavigate all'interno del componente
  const navigate = useNavigate();

  // Stato per gli articoli del carrello. Inizializza dallo storage locale.
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartlist")) || [];
    } catch (error) {
      console.error("Errore nel parsing del localStorage:", error);
      return [];
    }
  });
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [emailError, setEmailError] = useState(null);

  // Ref per il focus sulla email
  const emailRef = useRef(null);

  // Stato per i dati del modulo.
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    billing: {
      address: "",
      address2: "",
      zip: "",
      city: "",
      province: "",
      country: "",
    },
    delivery: {
      address: "",
      address2: "",
      zip: "",
      city: "",
      province: "",
      country: "",
    },
    payment: {
      cardNumber: "",
      expireDate: "",
      securityCode: "",
      cardOwner: "",
    },
  });

  // Stato per i campi obbligatori mancanti
  const [missingFields, setMissingFields] = useState([]);
  // Stato per mostrare errori visivi solo dopo submit
  const [showFieldErrors, setShowFieldErrors] = useState(false);

  const BASE_URL = "http://localhost:3030";
  const SELLER_EMAIL = "seller@example.com";

  // Fetch dei dati dei prodotti del carrello
  useEffect(() => {
    async function fetchData() {
      if (cartItems.length === 0) {
        setCartProducts([]);
        setTotalPrice(0);
        return;
      }
      try {
        const productsResponse = await fetch(`${BASE_URL}/api/products`);
        const productsData = await productsResponse.json();

        const cartListData = cartItems
          .map((item) => {
            const product = productsData.find((p) => p?.id === item?.id);
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

  // Calcolo del prezzo totale ogni volta che i prodotti del carrello cambiano
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

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleDirectInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailTrimmed = value.trim();
      const [_, domain] = emailTrimmed.split("@");
      if (!EMAIL_PATTERN.test(emailTrimmed)) {
        setEmailError("Inserisci un'email valida (es. nome@dominio.it)");
      } else if (!VALID_DOMINIONS.includes(domain)) {
        setEmailError("Inserisci un dominio email valido (es. gmail.com, yahoo.com)");
      } else {
        setEmailError(null);
      }
    }
  };


  const getMissingFields = () => {
    const { name, lastName, email, phone, billing } = formData;
    const fields = [];
    if (!name) fields.push("name");
    if (!lastName) fields.push("lastName");
    if (!email) fields.push("email");
    if (!phone) fields.push("phone");
    if (!billing.address) fields.push("billing.address");
    if (!billing.zip) fields.push("billing.zip");
    if (!billing.city) fields.push("billing.city");
    if (!billing.province) fields.push("billing.province");
    if (!billing.country) fields.push("billing.country");

    if (showDeliveryAddress) {
      const { delivery } = formData;
      if (!delivery.address) fields.push("delivery.address");
      if (!delivery.zip) fields.push("delivery.zip");
      if (!delivery.city) fields.push("delivery.city");
      if (!delivery.province) fields.push("delivery.province");
      if (!delivery.country) fields.push("delivery.country");
    }
    return fields;
  };


  useEffect(() => {
    setMissingFields(getMissingFields());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleOrder = async (e) => {
    e.preventDefault();

    const missing = getMissingFields();
    if (emailError) {
      missing.push("email");
    }
    setMissingFields(missing);

    if (missing.length > 0) {
      setShowFieldErrors(true);
      if (missing.includes("email") && emailRef.current) {
        emailRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        emailRef.current.focus();
      }
      return;
    }
    setShowFieldErrors(false);

    const shippingCost =
      totalPrice -
      cartProducts.reduce(
        (sum, product) => sum + product.price * product.currentQuantity,
        0
      );

    const orderData = {
      userEmail: formData.email,
      userName: formData.name,
      userLastName: formData.lastName,
      userPhone: formData.phone,
      billingAddress: formData.billing,
      totalPrice: totalPrice,
      products: cartProducts.map((p) => ({
        id: p.id,
        name: p.name,
        quantity: p.currentQuantity,
        price: p.price,
      })),
    };

    if (showDeliveryAddress) {
      orderData.deliveryAddress = formData.delivery;
    }

    try {
      // Salvataggio dell'ordine
      const purchaseResponse = await fetch(`${BASE_URL}/api/purchases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!purchaseResponse.ok) {
        const purchaseErrorData = await purchaseResponse.json();
        throw new Error(
          purchaseErrorData.message ||
          "Errore sconosciuto nel salvataggio dell'ordine"
        );
      }

      // 1. Recupera il numero d'ordine dalla risposta del server
      const purchaseData = await purchaseResponse.json();
      const orderNumber = purchaseData.order_number; // Assumi che il server ritorni { order_number: '...' }

      // 2. Prepara il corpo delle email includendo il numero d'ordine
      const productListHtml = cartProducts
        .map(
          (p) =>
            `<li>${p.name} (${p.currentQuantity}x) - €${(
              p.price * p.currentQuantity
            ).toFixed(2)}</li>`
        )
        .join("");

      const emailBodyBuyer = `
        <h1>Riepilogo del tuo Ordine</h1>
        <p>Gentile ${formData.name},</p>
        <p>Il tuo ordine **#${orderNumber}** è stato ricevuto con successo. Di seguito trovi il riepilogo:</p>
        <ul>
          ${productListHtml}
        </ul>
        <p>Costo di spedizione: €${shippingCost.toFixed(2)}</p>
        <p><strong>Totale ordine: €${totalPrice.toFixed(2)}</strong></p>
        <p>Grazie per il tuo acquisto!</p>
      `;

      const emailBodySeller = `
          <h1>Nuovo Ordine Ricevuto</h1>
          <p>Ciao venditore,</p>
          <p>Hai ricevuto un nuovo ordine da ${formData.name} ${formData.lastName}.</p>
          <p>Numero d'ordine: **#${orderNumber}**</p>
          <p>Dettagli dell'ordine:</p>
          <ul>
              ${productListHtml}
          </ul>
          <p>Costo di spedizione: €${shippingCost.toFixed(2)}</p>
          <p><strong>Totale ordine: €${totalPrice.toFixed(2)}</strong></p>
          <p>Dettagli utente:</p>
          <ul>
              <li>Nome: ${formData.name}</li>
              <li>Cognome: ${formData.lastName}</li>
              <li>Email: ${formData.email}</li>
              <li>Telefono: ${formData.phone}</li>
          </ul>
          <p>Indirizzo di fatturazione:</p>
          <ul>
              <li>Indirizzo: ${formData.billing.address}</li>
              <li>CAP: ${formData.billing.zip}</li>
              <li>Città: ${formData.billing.city}</li>
              <li>Provincia: ${formData.billing.province}</li>
              <li>Nazione: ${formData.billing.country}</li>
          </ul>
          ${showDeliveryAddress
          ? `
              <p>Indirizzo di consegna:</p>
              <ul>
                  <li>Indirizzo: ${formData.delivery.address}</li>
                  <li>CAP: ${formData.delivery.zip}</li>
                  <li>Città: ${formData.delivery.city}</li>
                  <li>Provincia: ${formData.delivery.province}</li>
                  <li>Nazione: ${formData.delivery.country}</li>
              </ul>
          `
          : ""
        }
      `;
      // Invio email all'acquirente e al venditore
      await Promise.all([
        fetch(`${BASE_URL}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: formData.email,
            subject: `Conferma del tuo Ordine #${orderNumber}`,
            body: emailBodyBuyer,
          }),
        }),
        fetch(`${BASE_URL}/api/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: SELLER_EMAIL,
            subject: `Nuovo Ordine #${orderNumber} da ${formData.name} ${formData.lastName}`,
            body: emailBodySeller,
          }),
        }),
      ]);

      // Svuota il carrello e resetta il form
      setCartItems([]);
      localStorage.removeItem("cartlist");
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        billing: {
          address: "",
          address2: "",
          zip: "",
          city: "",
          province: "",
          country: "",
        },
        delivery: {
          address: "",
          address2: "",
          zip: "",
          city: "",
          province: "",
          country: "",
        },
        payment: {
          cardNumber: "",
          expireDate: "",
          securityCode: "",
          cardOwner: "",
        },
      });
      setShowDeliveryAddress(false);
      setIsAccordionOpen(false);

      // Prepara il riepilogo per la navigazione
      const summary = {
        products: cartProducts,
        totalPrice: totalPrice,
        shippingCost: shippingCost,
      };

      // 3. Naviga alla pagina di ringraziamento, passando i dati
      navigate("/thankyou", { state: { orderSummary: summary, orderNumber: orderNumber } });

    } catch (error) {
      console.error("Errore durante l'elaborazione dell'ordine:", error);
      // Mostra un alert di errore in caso di fallimento
      alert(`Si è verificato un errore durante l'ordine: ${error.message}. Riprova più tardi.`);
    }
  };
  const handleAccordionToggle = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <>
      <style>
        {`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #f7f9fc;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .card {
            background-color: #ffffff;
            border-radius: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            display: flex;
            flex-direction: column;
          }
          @media (min-width: 1024px) {
            .card {
              flex-direction: row;
            }
          }
          .form-section {
            padding: 2.5rem;
            flex: 3;
          }
          .summary-section {
            padding: 2.5rem;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            flex: 2;
            border-radius: 0 0 1.5rem 1.5rem;
          }
          @media (min-width: 1024px) {
            .summary-section {
              border-top: none;
              border-left: 1px solid #e5e7eb;
              border-radius: 0 1.5rem 1.5rem 0;
            }
          }
          .title {
            font-size: 2.25rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 1rem;
          }
          .subtitle {
            font-size: 1.5rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
            margin-top: 1.5rem;
          }
          .form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          @media (min-width: 768px) {
            .form-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          .form-group {
            margin-bottom: 1rem;
          }
          .form-group label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #4b5563;
            margin-bottom: 0.25rem;
          }
          .form-group input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
          .form-group input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
            outline: none;
          }
          .checkbox-group {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
          }
          .checkbox-group input {
            margin-right: 0.5rem;
          }
          .accordion-container {
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            margin-top: 2rem;
          }
          .accordion-header {
            padding: 1rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f9fafb;
            border-radius: 0.5rem;
          }
          .accordion-header h2 {
            font-size: 1.125rem;
            font-weight: 600;
            color: #374151;
            margin: 0;
          }
          .accordion-body {
            padding: 1rem;
          }
          .btn-submit {
            width: 100%;
            padding: 0.75rem 1.5rem;
            font-size: 1.125rem;
            font-weight: bold;
            color: #ffffff;
            background-color: #10b981;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.15s ease-in-out;
          }
          .btn-submit:hover {
            background-color: #059669;
          }
          .product-list {
            max-height: 400px;
            overflow-y: auto;
            padding-right: 0.5rem;
          }
          .product-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            background-color: #ffffff;
            padding: 1rem;
            border-radius: 0.75rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            margin-bottom: 1rem;
          }
          .product-item img {
            width: 64px;
            height: 64px;
            border-radius: 0.5rem;
            object-fit: cover;
          }
          .product-item h3 {
            font-size: 1rem;
            font-weight: 600;
            color: #4b5563;
            margin: 0;
          }
          .product-item p {
            font-size: 0.75rem;
            color: #6b7280;
            margin: 0;
          }
          .product-item span {
            font-weight: bold;
            color: #1f2937;
            margin-left: auto;
          }
          .summary-totals {
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #e5e7eb;
          }
          .summary-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #374151;
            margin-bottom: 0.5rem;
          }
          .summary-total-line {
            font-size: 1.25rem;
            font-weight: bold;
            color: #1f2937;
            padding-top: 0.5rem;
            border-top: 1px solid #e5e7eb;
            margin-top: 1rem;
          }
        `}
      </style>
      <div className="container">
        <div className="card card-checkout">
          <div className="form-section">
            <h1 className="title">Checkout</h1>
            <form onSubmit={handleOrder}>
              <h2 className="subtitle">Dati Personali</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nome <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleDirectInputChange}
                    placeholder="Mario"
                    style={showFieldErrors && missingFields.includes("name") ? { borderColor: '#b91c1c' } : {}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Cognome <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleDirectInputChange}
                    placeholder="Rossi"
                    style={showFieldErrors && missingFields.includes("lastName") ? { borderColor: '#b91c1c' } : {}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ref={emailRef}
                    value={formData.email}
                    onChange={handleDirectInputChange}
                    style={showFieldErrors && missingFields.includes("email") || emailError
                      ? { borderColor: '#b91c1c' }
                      : {}
                    }
                    placeholder="esempio@email.com"
                  />
                  {emailError && (
                    <div style={{ color: '#b91c1c', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                      {emailError}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefono <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleDirectInputChange}
                    placeholder="+39 123 456 7890"
                    style={showFieldErrors && missingFields.includes("phone") ? { borderColor: '#b91c1c' } : {}}
                  />
                </div>
              </div>
              <div style={{ marginTop: '0.5rem', marginBottom: '1rem', textAlign: 'center', color: '#b91c1c', fontSize: '0.95rem' }}>
                I campi contrassegnati con <span style={{ color: 'red' }}>*</span> sono obbligatori
              </div>


              <h2 className="subtitle">Indirizzo di Fatturazione</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="billingAddress">Indirizzo <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    id="billingAddress"
                    name="address"
                    value={formData.billing.address}
                    onChange={(e) => handleInputChange(e, "billing")}
                    placeholder="Via Roma n.1"
                    style={showFieldErrors && missingFields.includes("billing.address") ? { borderColor: '#b91c1c' } : {}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billingAddress2">
                    Piano, appartamento o scala
                  </label>
                  <input
                    type="text"
                    id="billingAddress2"
                    name="address2"
                    value={formData.billing.address2}
                    onChange={(e) => handleInputChange(e, "billing")}
                    placeholder="Es. Piano 2, Scala A"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billingZip">CAP <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    id="billingZip"
                    name="zip"
                    value={formData.billing.zip}
                    onChange={(e) => handleInputChange(e, "billing")}
                    placeholder="00100"
                    style={showFieldErrors && missingFields.includes("billing.zip") ? { borderColor: '#b91c1c' } : {}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billingCity">Città <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    id="billingCity"
                    name="city"
                    value={formData.billing.city}
                    onChange={(e) => handleInputChange(e, "billing")}
                    placeholder="Roma"
                    style={showFieldErrors && missingFields.includes("billing.city") ? { borderColor: '#b91c1c' } : {}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billingProvince">Provincia <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    id="billingProvince"
                    name="province"
                    value={formData.billing.province}
                    onChange={(e) => handleInputChange(e, "billing")}
                    placeholder="RM"
                    style={showFieldErrors && missingFields.includes("billing.province") ? { borderColor: '#b91c1c' } : {}}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billingCountry">Nazione <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    id="billingCountry"
                    name="country"
                    value={formData.billing.country}
                    onChange={(e) => handleInputChange(e, "billing")}
                    placeholder="Italia"
                    style={showFieldErrors && missingFields.includes("billing.country") ? { borderColor: '#b91c1c' } : {}}
                  />
                </div>
              </div>
              <div style={{ marginTop: '0.5rem', marginBottom: '1rem', textAlign: 'center', color: '#b91c1c', fontSize: '0.95rem' }}>
                I campi contrassegnati con <span style={{ color: 'red' }}>*</span> sono obbligatori
              </div>

              <h2 className="subtitle">Indirizzo di Consegna</h2>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="checkChecked"
                  checked={showDeliveryAddress}
                  onChange={() => setShowDeliveryAddress(!showDeliveryAddress)}
                />
                <label htmlFor="checkChecked">
                  Indirizzo di consegna diverso da quello di fatturazione
                </label>
              </div>
              {showDeliveryAddress && (
                <>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="deliveryAddress">Indirizzo <span style={{ color: 'red' }}>*</span></label>
                      <input
                        type="text"
                        id="deliveryAddress"
                        name="address"
                        value={formData.delivery.address}
                        onChange={(e) => handleInputChange(e, "delivery")}
                        placeholder="Via Roma n.1"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="deliveryAddress2">
                        Piano, appartamento o scala
                      </label>
                      <input
                        type="text"
                        id="deliveryAddress2"
                        name="address2"
                        value={formData.delivery.address2}
                        onChange={(e) => handleInputChange(e, "delivery")}
                        placeholder="Es. Piano 2, Scala A"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="deliveryZip">CAP <span style={{ color: 'red' }}>*</span></label>
                      <input
                        type="text"
                        id="deliveryZip"
                        name="zip"
                        value={formData.delivery.zip}
                        onChange={(e) => handleInputChange(e, "delivery")}
                        placeholder="00100"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="deliveryCity">Città <span style={{ color: 'red' }}>*</span></label>
                      <input
                        type="text"
                        id="deliveryCity"
                        name="city"
                        value={formData.delivery.city}
                        onChange={(e) => handleInputChange(e, "delivery")}
                        placeholder="Roma"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="deliveryProvince">Provincia <span style={{ color: 'red' }}>*</span></label>
                      <input
                        type="text"
                        id="deliveryProvince"
                        name="province"
                        value={formData.delivery.province}
                        onChange={(e) => handleInputChange(e, "delivery")}
                        placeholder="RM"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="deliveryCountry">Nazione <span style={{ color: 'red' }}>*</span></label>
                      <input
                        type="text"
                        id="deliveryCountry"
                        name="country"
                        value={formData.delivery.country}
                        onChange={(e) => handleInputChange(e, "delivery")}
                        placeholder="Italia"
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: '0.5rem', marginBottom: '1rem', textAlign: 'center', color: '#b91c1c', fontSize: '0.95rem' }}>
                    I campi contrassegnati con <span style={{ color: 'red' }}>*</span> sono obbligatori
                  </div>
                </>
              )}

              <div className="accordion-container">
                <div
                  className="accordion-header"
                  onClick={handleAccordionToggle}
                >
                  <h2>Aggiungi una carta per il pagamento</h2>
                  <span>{isAccordionOpen ? "▲" : "▼"}</span>
                </div>
                {isAccordionOpen && (
                  <div className="accordion-body">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Numero carta</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.payment.cardNumber}
                        onChange={(e) => handleInputChange(e, "payment")}
                      />
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="expireDate">Data di scadenza</label>
                        <input
                          type="text"
                          id="expireDate"
                          name="expireDate"
                          value={formData.payment.expireDate}
                          onChange={(e) => handleInputChange(e, "payment")}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="securityCode">
                          Codice di sicurezza
                        </label>
                        <input
                          type="text"
                          id="securityCode"
                          name="securityCode"
                          value={formData.payment.securityCode}
                          onChange={(e) => handleInputChange(e, "payment")}
                          placeholder="3 cifre sul retro"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardOwner">
                        Nome del proprietario della carta
                      </label>
                      <input
                        type="text"
                        id="cardOwner"
                        name="cardOwner"
                        value={formData.payment.cardOwner}
                        onChange={(e) => handleInputChange(e, "payment")}
                        placeholder="Mario Rossi"
                      />
                    </div>
                  </div>
                )}
              </div>

              {cartProducts.length > 0 && (
                <div style={{ marginTop: "2rem", textAlign: "center" }}>
                  {/* Messaggio di errore sopra il bottone se ci sono campi obbligatori mancanti e showFieldErrors è true */}
                  {showFieldErrors && missingFields.length > 0 && (
                    <div style={{ color: '#b91c1c', marginBottom: '1rem', fontWeight: 500 }}>
                      Compila tutti i campi obbligatori per procedere con l'ordine.
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn-submit"
                    style={{
                      backgroundColor: missingFields.length > 0 ? '#9ca3af' : '#10b981',
                      cursor: 'pointer',
                    }}
                  >
                    Ordina e Paga
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Sezione del riepilogo dell'ordine */}
          <div className="summary-section">
            <h2 className="title">Il tuo Ordine</h2>
            <div className="product-list">
              {cartProducts.length > 0 ? (
                cartProducts.map((product) => (
                  <div key={product.id} className="product-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) =>
                      (e.target.src =
                        "https://placehold.co/100x100?text=Immagine")
                      }
                    />
                    <div>
                      <h3>{product.name}</h3>
                      <p>Quantità: {product.currentQuantity}</p>
                    </div>
                    <span>
                      €{(product.price * product.currentQuantity).toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", color: "#6b7280" }}>
                  Il carrello è vuoto.
                </p>
              )}
            </div>
            {cartProducts.length > 0 && (
              <div className="summary-totals">
                <div className="summary-line">
                  <span>Subtotale</span>
                  <span>
                    €
                    {cartProducts
                      .reduce((sum, p) => sum + p.price * p.currentQuantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="summary-line">
                  <span>Spedizione</span>
                  <span>
                    {(() => {
                      const shipping = totalPrice - cartProducts.reduce(
                        (sum, p) => sum + p.price * p.currentQuantity,
                        0
                      );
                      return shipping === 0
                        ? 'Gratis'
                        : `€${shipping.toFixed(2)}`;
                    })()}
                  </span>
                </div>
                <div className="summary-line summary-total-line">
                  <span>Totale</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default function App() {
  return <CheckoutPage />;
}