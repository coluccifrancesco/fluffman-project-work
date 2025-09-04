import CardItem from "./CardComponent/CardItem"


export default function CatProductsPage() {
    return (
        <>
            <div className="m-2 p-2">
                <h1>Il regno dei Gatti</h1>
                <p>Corrono, saltano, miagolano, qui una vasta scelta per avere un gatto sempre felice</p>
            </div>

            {/* Sezione Food */}
            <div className="m-2 p-2">
                <h2>Un lauto pasto per il tuo gtto esigente</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
                    {[...Array(6)].map((_, idx) => (
                        <CardItem key={idx} title={`Scelta ${idx + 1}`} />
                    ))}
                </div>
            </div>

            {/* Sezione accessori */}
            <div className="m-2 p-2">
                <h2>Tiragraffi, lettiere, ciotole per il cibo, giochi, se quakcosa manca al tuo gatto lo trovi qui</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
                    {[...Array(6)].map((_, idx) => (
                        <CardItem key={idx} title={`Scelta ${idx + 1}`} />
                    ))}
                </div>
            </div>

            {/* Sezione Cura */}
            <div className="m-2 p-2">
                <h2>Un gatto bello e in salute, con i nostri prodotti</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
                    {[...Array(6)].map((_, idx) => (
                        <CardItem key={idx} title={`Scelta ${idx + 1}`} />
                    ))}
                </div>
            </div>
        </>
    )
}