import React from 'react'

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


    return (
        <>
            <div className="container mt-">
                <form className="row g-3">
                    <div className="col-md-4">
                        <label for="userName" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="userName" placeholder="Mario" />
                    </div>
                    <div className="col-md-4">
                        <label for="userLastName" className="form-label">Cognome</label>
                        <input type="text" className="form-control" id="userLastName" placeholder="Rossi" />
                    </div>
                    <div className="col-md-4">
                        <label for="usermail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="usermail" placeholder="mariorossi@gmail.com" />
                    </div>
                    <div className="col-md-4">
                        <label for="inputCity" className="form-label">Città</label>
                        <input type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="col-md-4">
                        <label for="inputProvince" className="form-label">Provincia</label>
                        <input type="text" className="form-control" id="inputProvince" />
                    </div>
                    <div className="col-md-4">
                        <label for="inputCap" className="form-label">CAP</label>
                        <input type="text" className="form-control" id="inputCap" />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Indirizzo di Consegna</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Via Napoli n.3" />
                    </div>
                    <div className="col-12">
                        <label for="inputAddress2" className="form-label">Informazioni aggiuntive per la consegna</label>
                        <input type="text area" className="form-control" id="inputAddress2" placeholder="Es. Piano 2, Scala A, Citofono: Rossi Mario" />
                    </div>

                </form>
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Aggiungi una carta per il pagamento
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <form className="row g-3">
                                <div className="col-md-12">
                                    <label for="cardNumber" className="form-label">Numero carta</label>
                                    <input type="text" className="form-control" id="cardNumber" />
                                </div>
                                <div className="col-md-6">
                                    <label for="expireDate" className="form-label">Data di scadenza</label>
                                    <input type="text" className="form-control" id="expireDate" />
                                    <div class="form-text" id="basic-addon4">Parte anteriore della carta in formato MM/YY</div>
                                </div>
                                <div className="col-md-6">
                                    <label for="securityCode" className="form-label">Codice di sicurezza</label>
                                    <input type="text" className="form-control" id="securityCode" />
                                    <div class="form-text" id="basic-addon4">3 cifre sul retro della carta</div>
                                </div>
                                <div className="col-md-12">
                                    <label for="cardOwner" className="form-label">Nome del proprietario della carta</label>
                                    <input type="text" className="form-control" id="cardOwner" placeholder="Mario Rossi" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <button onClick={handleClick} type="submit" className="btn btn-primary">Ordina e paga</button>
                </div>
            </div>
        </>
    )
}