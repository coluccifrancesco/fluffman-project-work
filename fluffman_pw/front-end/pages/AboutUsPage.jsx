import "../styles/HomePage.css"; // puoi creare anche un css dedicato tipo OurStory.css

export default function OurStoryPage() {
    return (
        <div className="hp_bg">
            <div className="p-3">
                <div className="container my-5">
                    {/* Titolo principale */}
                    <h1 className="mb-4 text-center">La Nostra Storia</h1>

                    {/* Sezione introduttiva */}
                    <div className="row align-items-center mb-5">
                        <div className="col-12 col-md-6">
                            <img
                                className="img-fluid rounded shadow"
                                src="/our_story_placeholder.png"
                                alt="la nostra storia"
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <p className="lead text-light">
                                La nostra avventura è iniziata con una semplice idea: offrire
                                prodotti di qualità che portino benessere e felicità ai nostri
                                amici a quattro zampe. Da un piccolo progetto familiare, siamo
                                cresciuti fino a diventare una realtà che mette al centro
                                passione, cura e amore per gli animali.
                            </p>
                        </div>
                    </div>

                    {/* Sezione timeline o step */}
                    <div className="my-5">
                        <h2 className="text-center mb-4">Il Nostro Percorso</h2>
                        <div className="row g-4">
                            <div className="col-12 col-md-4 text-center">
                                <div className="p-4 bg-light border rounded shadow-sm h-100">
                                    <h3>2020</h3>
                                    <p>
                                        Nasce l’idea e cominciamo con i primi prodotti dedicati agli
                                        animali domestici.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 text-center">
                                <div className="p-4 bg-light border rounded shadow-sm h-100">
                                    <h3>2022</h3>
                                    <p>
                                        Ampliamo il nostro catalogo e apriamo lo shop online per
                                        raggiungere più famiglie.
                                    </p>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 text-center">
                                <div className="p-4 bg-light border rounded shadow-sm h-100">
                                    <h3>Oggi</h3>
                                    <p>
                                        Continuiamo a crescere, sempre con lo stesso obiettivo:
                                        garantire il meglio per i piccoli amici.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission/Valori */}
                    <div className="my-5 text-center">
                        <h2>I Nostri Valori</h2>
                        <p className="mt-3 text-light">
                            Crediamo nell’amore incondizionato tra persone e animali. Per
                            questo ogni nostro prodotto è pensato per migliorare la vita dei
                            nostri amici pelosi, rispettando sempre qualità, sicurezza e
                            sostenibilità.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
