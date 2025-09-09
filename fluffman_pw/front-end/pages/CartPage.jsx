import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CartPage.css"

export default function CartPage() {

    const [products, setProducts] = useState([]);


    // Implementare logica di salvataggio in locale degli elementi, 
    // una volta premuto il carrello per comprarli.
    // Inserirli nell'array e fare un map nel carrello per mostrarli
    // Da discutere successivamente come muoversi a riguardo


    return <>

        <div className="pt-5 px-5 d-flex justify-content-between align-items-center">
            <h1 className="m-0">Il tuo carrello</h1>
            <Link to={"/"} className="text-decoration-none d-none d-sm-block"><p className="m-0">Continua lo shopping!</p></Link>
            <Link to={"/"} className="text-decoration-none d-block d-sm-none"><p className="m-0">Home</p></Link>
        </div>

        <section className="container-fluid px-5">

            {/* Nomi rispettive colonne */}
            <div className="row text-black-50 py-3">
                <div className="col-5 col-md-2">PRODOTTO</div>
                <div className="d-none d-md-block col-md-5"></div>
                <div className="col-4 col-md-3">QUANTITÀ</div>
                <div className="col-3 col-md-2 text-end">TOTALE</div>
            </div>


            {/* TEMPLATE per ora adatto solo da tablet in sù */}
            {/* ↓ Da inserire ed adattare in un map */}
            <div className="row py-3 border-top">

                {/* Immagine */}
                <div className="d-none d-md-block col-md-2 col-xxl-1">
                    <img className="w-100 max-width-img" src="https://picsum.photos/800/800" alt="Immagine del prodotto" />
                </div>

                {/* Nome prodotto e peso */}
                <div className="col-5 col-xxl-6 d-flex justify-content-center align-items-start flex-column">
                    <h5 className="m-0">Nome prodotto</h5>
                    <p className="m-0 d-none d-sm-block">Peso:</p>
                </div>

                {/* Quantità da sm in sù */}
                <div className="col-4 col-md-3 d-none d-sm-flex justify-content-start align-items-center gap-2">
                    <button className="quantity-btn">-</button>
                    <p className="fs-2 m-0 px-2">0</p>
                    <button className="quantity-btn">+</button>
                    <button className="trash-btn"><i className="fa-solid fa-trash-can"></i></button>
                </div>

                {/* Quantità da sm in giù */}
                <div className="col-4 d-flex d-sm-none justify-content-start align-items-center">
                    <div className="d-flex justify-content-start align-items-center gap-1 flex-column">
                        <button className="quantity-btn-mobile">+</button>
                        <p className="fs-4 m-0 px-2">0</p>
                        <button className="quantity-btn-mobile">-</button>
                    </div>

                    <button className="trash-btn-mobile fs-5"><i className="fa-solid fa-trash-can"></i></button>
                </div>

                {/* Prezzo del prodotto */}
                <div className="col-3 col-md-2 d-flex justify-content-end align-items-center">
                    <h5 className="text-end m-0">€00.00</h5>
                </div>

            </div>


            {/* Spedizione, da inserire logica calcolo del costo */}
            <div className="row border-top py-3">

                {/* La colonna vuota serve per spaziare */}
                <div className="d-none d-sm-block col-sm-5 col-md-7"></div>

                <div className="col-10 col-sm-5 col-md-3">
                    <p className="m-0">Costo spedizione:</p>
                </div>

                {/* Logica da inserire qui */}
                <div className="col-2 text-end">
                    <p className="m-0">Gratis</p>
                </div>

            </div>


            {/* Subtotale */}
            <div className="row border-top pt-4">

                {/* La colonna vuota serve per spaziare */}
                <div className="d-none d-sm-block col-sm-5 col-md-7"></div>

                <div className="col-9 col-sm-5 col-md-3">
                    <p className="m-0 sub-text">Subtotale:</p>
                </div>

                {/* Logica da inserire qui */}
                <div className="col-3 col-sm-2 text-end">
                    <h5 className="m-0 sub-text">€00.00</h5>
                </div>

            </div>


            {/* {products.length === 0 ? 
            
            :
            
            } */}
            

            {/* Checkout da sm in sù */}
            <div className="d-none d-sm-flex justify-content-end align-items-center check-cont">
                <Link to="/checkout"><button className="check-btn">Checkout<i className="fa-solid fa-cart-shopping"></i></button></Link>
            </div>

            {/* Checkout da sm in giù */}
            <div className="d-block d-sm-none check-cont">
                <Link to="/checkout"><button className="check-btn-mobile w-100">Checkout<i className="fa-solid fa-cart-shopping"></i></button></Link>
            </div>

        </section>

    </>
}