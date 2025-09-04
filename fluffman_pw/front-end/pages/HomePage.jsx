import "../styles/HomePage.css";
import Carousel from "../components/HeroSpace";
import CardItem from "../components/CardComponent/CardItem";
import NewProducts from "../components/NewProducts";

export default function HomePage() {
    return (
        <div className="hp_bg p-3">
            {/* Carousel Component */}
            <div className="d-flex justify-content-center align-content-center">
                <Carousel />
            </div>

            <div className="container my-4">
                {/*Section - Best Sellers */}
                <h2 className="mb-3">Nuovi Prodotti</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {[...Array(4)].map((_, idx) => (
                        <CardItem key={idx} title={`Prodotto ${idx + 1}`} />
                    ))}
                </div>

                {/* Double mid Banner */}
                <div className="container mid-banner my-5">
                    <div className="row g-3">
                        <div className="col-12 col-md-6 text-center p-4 border rounded">
                            <img
                                className="img-fluid rounded"
                                src="/BCC_placeholder.png"
                                alt="black_cats_coding"
                            />
                        </div>
                        <div className="col-12 col-md-6 text-center p-4 border rounded">
                            <img
                                className="img-fluid rounded"
                                src="/Doggo_placeholder.png"
                                alt="doggo_shipping"
                            />
                        </div>
                    </div>
                </div>

                {/* Section -  i più venduti */}
                <h2 className="mb-3">I più venduti</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
                    {[...Array(6)].map((_, idx) => (
                        <CardItem key={idx} title={`Scelta ${idx + 1}`} />
                    ))}
                </div>

                {/* Section - Ultimi Arrivi */}
                <NewProducts />
            </div>
        </div>
    );
}
