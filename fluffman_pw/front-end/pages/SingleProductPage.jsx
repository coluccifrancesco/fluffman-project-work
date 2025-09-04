import CardProductDetail from "../components/CardComponent/CardProductDetails";
import CardItem from "../components/CardComponent/CardItem";

export default function SingleProductPage() {
    return (
        <>
            <div className="container">

                <div>
                    <h2>Dettagli sul prodotto</h2>
                    <div>
                        <CardProductDetail />
                        <button className="btn" type="button">Aggiungi al Carrello</button>
                    </div>

                    <div className="m-2 p-2">
                        <h2>Prodotti simili</h2>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
                            {[...Array(6)].map((_, idx) => (
                                <CardItem key={idx} title={`Scelta ${idx + 1}`} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}