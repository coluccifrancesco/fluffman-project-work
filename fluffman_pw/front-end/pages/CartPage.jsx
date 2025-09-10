import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/CartPage.css";
import { useCart } from "../context/CartContext";

export default function CartPage() {
    const navigate = useNavigate();
    const BASE_URL = "http://localhost:3030";
    const { cart, removeFromCart, updateQuantity } = useCart();

    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Fetch dei dati e gestione dell'immagine.
    useEffect(() => {
        async function fetchData() {
            try {
                const productsResponse = await fetch(`${BASE_URL}/api/products`);
                const productsData = await productsResponse.json();

                const cartListData = cart.map(item => {
                    const product = productsData.find(p => p?.id === item?.id);
                    if (!product) return null;

                    let imageUrl = null;
                    if (product?.image_path) {
                        let cleanPath = product.image_path.trim();

                        const baseUrlPattern = "/api/images/";
                        if (cleanPath.includes(baseUrlPattern)) {
                            const lastIndex = cleanPath.lastIndexOf(baseUrlPattern);
                            if (lastIndex > 0) {
                                cleanPath = cleanPath.substring(lastIndex);
                            }
                        }
                        if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
                            imageUrl = cleanPath;
                        } else if (cleanPath.startsWith('/api/images/')) {
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
                        price: parseFloat(product.price)
                    };
                }).filter(Boolean);

                setCartProducts(cartListData);
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
            }
        }
        fetchData();
    }, [cart]);

    // Calcola il totale ogni volta che la lista dei prodotti cambia.
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

    // Rimuove un prodotto dal carrello tramite context
    const onRemove = (product) => {
        removeFromCart(product.id);
    }

    // Gestisce l'aumento o la diminuzione della quantità tramite context
    const handleQuantityChange = (product, change) => {
        const newQuantity = product.currentQuantity + change;
        if (newQuantity > 0 && newQuantity <= product.availableQuantity) {
            updateQuantity(product.id, newQuantity);
        }
    };

    // Funzione per la validazione prima del reindirizzamento
    const handleCheckoutRedirect = async () => {
        try {
            const productsResponse = await fetch(`${BASE_URL}/api/products`);
            const productsData = await productsResponse.json();

            let outOfStockItems = [];

            for (const item of cart) {
                const availableProduct = productsData.find(p => p.id === item.id);
                if (!availableProduct || item.quantity > availableProduct.quantity) {
                    outOfStockItems.push({
                        name: availableProduct ? availableProduct.name : `Prodotto con ID ${item.id}`,
                        requested: item.quantity,
                        available: availableProduct ? availableProduct.quantity : 0
                    });
                }
            }

            if (outOfStockItems.length > 0) {
                let message = "Ci sono problemi con la disponibilità dei seguenti prodotti:\n\n";
                outOfStockItems.forEach(item => {
                    message += ` - ${item.name}: quantità richiesta (${item.requested}) supera la disponibilità (${item.available})\n`;
                });
                message += "\nPer favore, aggiorna il tuo carrello.";
                setModalMessage(message);
                setShowModal(true);
            } else {
                navigate('/checkout');
            }
        } catch (error) {
            setModalMessage("Si è verificato un errore durante la verifica della disponibilità. Riprova più tardi.");
            setShowModal(true);
            console.error("Errore durante la verifica della disponibilità:", error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalMessage("");
    };

    return (
        <>
            <div className="pt-5 px-5 d-flex justify-content-between align-items-center">
                <h1 className="m-0">Il tuo carrello</h1>
                <Link to={"/"} className="text-decoration-none d-none d-sm-block"><p className="m-0">Continua lo shopping!</p></Link>
                <Link to={"/"} className="text-decoration-none d-block d-sm-none"><p className="m-0">Home</p></Link>
            </div>

            <section className="container-fluid px-5">
                <div className="row text-black-50 py-3">
                    <div className="col-5 col-md-2">PRODOTTO</div>
                    <div className="d-none d-md-block col-md-5"></div>
                    <div className="col-4 col-md-3">QUANTITÀ</div>
                    <div className="col-3 col-md-2 text-end">TOTALE</div>
                </div>

                {cartProducts.length > 0 ? (
                    cartProducts.map((product) => (
                        <div className="row py-3 border-top" key={product.id}>
                            <div className="d-none d-md-block col-md-2 col-xxl-1">
                                <img className="w-100 max-width-img" src={product.image} alt="Immagine del prodotto" />
                            </div>
                            <div className="col-5 col-xxl-6 d-flex justify-content-center align-items-start flex-column">
                                <h5 className="m-0">{product.name}</h5>
                            </div>
                            <div className="col-4 col-md-3 d-none d-sm-flex justify-content-start align-items-center gap-2">
                                <button
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(product, -1)}
                                    disabled={product.currentQuantity <= 1}
                                >
                                    -
                                </button>
                                <p className="fs-2 m-0 px-2">{product.currentQuantity}</p>
                                <button
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(product, 1)}
                                    disabled={product.currentQuantity >= product.availableQuantity}
                                >
                                    +
                                </button>
                                <button className="trash-btn" onClick={() => onRemove(product)}><i className="fa-solid fa-trash-can"></i></button>
                            </div>
                            <div className="col-4 d-flex d-sm-none justify-content-start align-items-center">
                                <div className="d-flex justify-content-start align-items-center gap-1 flex-column">
                                    <button
                                        className="quantity-btn-mobile"
                                        onClick={() => handleQuantityChange(product, 1)}
                                        disabled={product.currentQuantity >= product.availableQuantity}
                                    >
                                        +
                                    </button>
                                    <p className="fs-4 m-0 px-2">{product.currentQuantity}</p>
                                    <button
                                        className="quantity-btn-mobile"
                                        onClick={() => handleQuantityChange(product, -1)}
                                        disabled={product.currentQuantity <= 1}
                                    >
                                        -
                                    </button>
                                </div>
                                <button className="trash-btn-mobile fs-5" onClick={() => onRemove(product)}><i className="fa-solid fa-trash-can"></i></button>
                            </div>
                            <div className="col-3 col-md-2 d-flex justify-content-end align-items-center">
                                <h5 className="text-end m-0">€{(product.price * product.currentQuantity).toFixed(2)}</h5>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="row py-5 text-center">
                        <div className="col-12">
                            <p className="m-0 text-muted">Il tuo carrello è vuoto.</p>
                        </div>
                    </div>
                )}

                {cartProducts.length > 0 && (
                    <>
                        <div className="row border-top py-3">
                            <div className="d-none d-sm-block col-sm-5 col-md-7"></div>
                            <div className="col-10 col-sm-5 col-md-3">
                                <p className="m-0">Costo spedizione:</p>
                            </div>
                            <div className="col-2 text-end">
                                <p className="m-0">{totalPrice - cartProducts.reduce((sum, product) => sum + (product.price * product.currentQuantity), 0) === 0 ? "Gratis" : `€${(totalPrice - cartProducts.reduce((sum, product) => sum + (product.price * product.currentQuantity), 0)).toFixed(2)}`}</p>
                            </div>
                        </div>

                        <div className="row border-top pt-4">
                            <div className="d-none d-sm-block col-sm-5 col-md-7"></div>
                            <div className="col-9 col-sm-5 col-md-3">
                                <p className="m-0 sub-text">Subtotale:</p>
                            </div>
                            <div className="col-3 col-sm-2 text-end">
                                <h5 className="m-0 sub-text">€{totalPrice.toFixed(2)}</h5>
                            </div>
                        </div>
                    </>
                )}

                {cartProducts.length > 0 && (
                    <div className="d-none d-sm-flex justify-content-end align-items-center check-cont">
                        <button className="check-btn" onClick={handleCheckoutRedirect}>
                            Checkout<i className="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                )}

                {cartProducts.length > 0 && (
                    <div className="d-block d-sm-none check-cont">
                        <button className="check-btn-mobile w-100" onClick={handleCheckoutRedirect}>
                            Checkout<i className="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                )}
            </section>

            {/* Modal di avviso */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Attenzione</h5>
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={closeModal}>
                                    Chiudi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
