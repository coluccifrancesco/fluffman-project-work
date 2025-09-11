import { Link } from "react-router-dom"

export default function ThankYouPage() {


    return (
        <>
            <div className="container m-3 p-3">
                <h1>Grazie per averci scelto!</h1>

                <h3 className="recap-title">Ecco un riepilogo del tuo acquisto</h3>

                <div className="container border border-dark rounded-4">

                    <div className="recap-info p-3">
                        <p className="text-dark">Prodotti:</p>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                        <p className="text-dark">Costo di spedizione:{" "}
                            <span className="total">
                                €
                            </span>
                        </p>
                        <p className="text-dark">Totale ordine:{" "}
                            <span className="total">
                                €
                            </span>
                        </p>
                    </div>

                </div>

                <div className="container m-3 p-3">

                    <Link to="/"> <button className="btn btn-secondary">Torna alla Home</button> </Link>

                </div>
            </div>
        </>
    )
}