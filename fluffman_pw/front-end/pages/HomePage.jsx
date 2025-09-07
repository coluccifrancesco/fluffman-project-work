import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import Carousel from "../components/HeroSpace";
import SuggestedProducts from "../components/SuggestedProducts";
import NewProducts from "../components/NewProducts";
// import DogProducts from "../components/DogProducts";
// import CatProducts from "../components/CatProducts";

export default function HomePage() {
  return (
    <div className="hp_bg">
      {/* Carousel Component */}
      <Carousel />
      <div className="p-3">
        <div className="container my-4">
          {/*Section - Suggested Products */}
          <SuggestedProducts />

          {/* Double mid Banner */}
          <div className="container mid-banner my-5">
            <div className="row g-3">
              <div className="col-12 col-md-6 text-center p-4 rounded">
                <Link to="/Contacts">
                  <img
                    className="img-fluid rounded"
                    src="/BCC_placeholder.png"
                    alt="black_cats_coding"
                  />
                </Link>
              </div>
              <div className="col-12 col-md-6 text-center p-4 rounded">
                <img
                  className="img-fluid rounded"
                  src="/Doggo_placeholder.png"
                  alt="doggo_shipping"
                />
              </div>
            </div>
          </div>

          {/* Section - Ultimi Arrivi */}
          <h2 className="my-4 text-center">Ultimi Arrivi</h2>
          <NewProducts />
          {/* <DogProducts />
          <CatProducts /> */}
        </div>
      </div>
    </div>
  );
}
