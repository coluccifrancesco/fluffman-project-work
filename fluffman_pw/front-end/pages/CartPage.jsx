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
            <Link to={"/"} className="text-decoration-none"><p className="m-0">Continua lo shopping!</p></Link>
        </div>

        <section className="container-fluid px-5">

            {/* Nomi rispettive colonne */}
            <div className="row text-black-50 py-3">
                <div className="col-md-2">PRODOTTO</div>
                <div className="col-md-5"></div>
                <div className="col-md-3">QUANTITÀ</div>
                <div className="col-md-2 text-end">TOTALE</div>
            </div>


            {/* TEMPLATE per ora adatto solo da tablet in sù */}
            {/* ↓ Da inserire ed adattare in un map */}
            <div className="row py-3 border-top">

                {/* Immagine */}
                <div className="col-md-2">
                    <img className="w-100" src="https://picsum.photos/800/800" alt="Immagine del prodotto" />
                </div>

                {/* Nome prodotto e peso */}
                <div className="col-md-5 d-flex justify-content-center align-items-start flex-column">
                    <h5 className="m-0">Nome prodotto</h5>
                    <p className="m-0">Peso:</p>
                </div>

                {/* Quantità */}
                <div className="col-md-3 d-flex justify-content-start align-items-center gap-2">
                    <div className="d-flex justify-content-start align-items-center gap-3 quantity-container">
                        <button className="quantity-btn">-</button>
                        <p className="m-0">0</p>
                        <button className="quantity-btn">+</button>
                    </div>

                    <button className="trash-btn"><i class="fa-solid fa-trash-can"></i></button>
                </div>

                {/* Prezzo del prodotto */}
                <div className="col-md-2 d-flex justify-content-end align-items-center">
                    <h5 className="text-end m-0">€00.00</h5>
                </div>

            </div>


            {/* Spedizione, da inserire logica calcolo del costo */}
            <div className="row border-top py-3">

                {/* La colonna vuota serve per spaziare */}
                <div className="col-md-7"></div>
                
                <div className="col-md-3">
                    <p className="m-0">Costo spedizione:</p>
                </div>
                
                {/* Logica da inserire qui */}
                <div className="col-md-2 text-end">
                    <p className="m-0">Gratis</p>
                </div>
            
            </div>


            {/* Subtotale */}
            <div className="row border-top pt-4">
               
                {/* La colonna vuota serve per spaziare */}
                <div className="col-md-7"></div>
                
                <div className="col-md-3">
                    <p className="m-0 sub-text">Subtotale:</p>
                </div>
                
                {/* Logica da inserire qui */}
                <div className="col-md-2 text-end">
                    <p className="m-0 sub-text">€00.00</p>
                </div>
            
            </div>

            <div className="d-flex justify-content-end align-items-center check-cont">
                <Link><button className="check-btn">Checkout<i class="fa-solid fa-cart-shopping"></i></button></Link>
            </div>

        </section>

    </>
}