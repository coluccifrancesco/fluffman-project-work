import CardItem from "./CardComponent/CardItem"


export default function OtherAnimalProductsPage() {
    return (
        <>
            <div className="m-2 p-2">
                <h1>Non solo cani e gatti</h1>
                <p>Pappagalli, criceti pesci rossi, qui prodotti per ogni nimale</p>
            </div>

            {/* Sezione Food */}
            <div className="m-2 p-2">
                <h2>Cibi e mangimi vari</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
                    {[...Array(6)].map((_, idx) => (
                        <CardItem key={idx} title={`Scelta ${idx + 1}`} />
                    ))}
                </div>
            </div>

            {/* Sezione accessori */}
            <div className="m-2 p-2">
                <h2>Accessori per ogni esigenza</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
                    {[...Array(6)].map((_, idx) => (
                        <CardItem key={idx} title={`Scelta ${idx + 1}`} />
                    ))}
                </div>
            </div>

            {/* Sezione Cura */}
            <div className="m-2 p-2">
                <h2>Tutto per la cura del tuo animale</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
                    {[...Array(6)].map((_, idx) => (
                        <CardItem key={idx} title={`Scelta ${idx + 1}`} />
                    ))}
                </div>
            </div>
        </>
    )
}