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

                    {/* Sezione team */}
                    <div className="my-5">
                        <h2 className="text-center mb-4">Il Nostro Team</h2>
                        <div className="row g-4 justify-content-center">
                            {/* Membro 1 - Nicola Domingo Rizzo */}
                            <div className="col-12 col-md-4 text-center">
                                <div className="p-4 bg-light border rounded shadow-sm h-100 d-flex flex-column align-items-center">
                                    <img
                                        className="rounded-circle mb-3"
                                        src="/dev_pic/nico.jpeg"
                                        alt="Foto di Nicola Domingo Rizzo"
                                        style={{ width: "150px", height: "150px" }}
                                    />
                                    <h3 className="mb-1">Nicola Domingo Rizzo</h3>
                                    <p>Back-End Developer</p>
                                    <a
                                        href="https://github.com/nicoladomingorizzo"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="bi bi-github fs-3"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Membro 2 - Adriano Rotondo */}
                            <div className="col-12 col-md-4 text-center">
                                <div className="p-4 bg-light border rounded shadow-sm h-100 d-flex flex-column align-items-center">
                                    <img
                                        className="rounded-circle mb-3"
                                        src="/dev_pic/adriano.jpeg"
                                        alt="Foto di Adriano Rotondo"
                                        style={{ width: "150px", height: "150px" }}
                                    />
                                    <h3 className="mb-1">Adriano Rotondo</h3>
                                    <p>Front-End Developer</p>
                                    <a
                                        href="https://github.com/Adriano-Rotondo-dev"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="bi bi-github fs-3"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Membro 3 - Francesco Colucci */}
                            <div className="col-12 col-md-4 text-center">
                                <div className="p-4 bg-light border rounded shadow-sm h-100 d-flex flex-column align-items-center">
                                    <img
                                        className="rounded-circle mb-3"
                                        src="/dev_pic/colucci.jpeg"
                                        alt="Foto di Francesco Colucci"
                                        style={{ width: "150px", height: "150px" }}
                                    />
                                    <h3 className="mb-1">Francesco Colucci</h3>
                                    <p>Front-end Developer</p>
                                    <a
                                        href="https://github.com/coluccifrancesco"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="bi bi-github fs-3"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Membro 4 - Mariya Dyshkant */}
                            <div className="col-12 col-md-4 text-center">
                                <div className="p-4 bg-light border rounded shadow-sm h-100 d-flex flex-column align-items-center">
                                    <img
                                        className="rounded-circle mb-3"
                                        src="/dev_pic/mariya.jpeg"
                                        alt="Foto di Mariya Dyshkant"
                                        style={{ width: "150px", height: "150px" }}
                                    />
                                    <h3 className="mb-1">Mariya Dyshkant</h3>
                                    <p>Front-end Developer</p>
                                    <a
                                        href="https://github.com/mariyadyshkant"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="bi bi-github fs-3"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Membro 5 - Francesco Salus */}
                            <div className="col-12 col-md-4 text-center">
                                <div className="p-4 bg-light border rounded shadow-sm h-100 d-flex flex-column align-items-center">
                                    <img
                                        className="rounded-circle mb-3"
                                        src="/dev_pic/ciccio.jpeg"
                                        alt="Foto di Francesco Sales"
                                        style={{ width: "150px", height: "150px" }}
                                    />
                                    <h3 className="mb-1">Francesco Sales</h3>
                                    <p>Front-end Developer</p>
                                    <a
                                        href="https://github.com/FrancescoSls97"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                    >
                                        <i className="bi bi-github fs-3"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}