import CardItem from "../components/CardComponent/CardItem";
export default function DogProductsPage() {
  return (
    <>
      <div className="m-2 p-2">
        <h1>Il meglio per il tuo cane</h1>
        <p>
          La nostra ampia scelta di prodotti per cani, propone prodotti di
          altissima qualità per prenderti cura al meglio del tuo amico a 4 zampe
        </p>
      </div>

      {/* Sezione Food */}
      <div className="m-2 p-2">
        <h2>Il tuo cane merita di mangiare da re</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
          {[...Array(6)].map((_, idx) => (
            <CardItem key={idx} title={`Scelta ${idx + 1}`} />
          ))}
        </div>
      </div>

      {/* Sezione accessori */}
      <div className="m-2 p-2">
        <h2>
          Giochi, collari, cucce, tutto, ma proprio tutto ciò che serve per il
          tuo cane
        </h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
          {[...Array(6)].map((_, idx) => (
            <CardItem key={idx} title={`Scelta ${idx + 1}`} />
          ))}
        </div>
      </div>

      {/* Sezione Cura */}
      <div className="m-2 p-2">
        <h2>Tutto ciò che serve per la cura del tuo cane lo trovi qui</h2>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4">
          {[...Array(6)].map((_, idx) => (
            <CardItem key={idx} title={`Scelta ${idx + 1}`} />
          ))}
        </div>
      </div>
    </>
  );
}
