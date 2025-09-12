import "../styles/StorePage.css";
import { Link } from "react-router-dom";

// Componente per una singola scheda del negozio
const StoreCard = ({ name, address, phone, hours, mapsLink }) => {
    return (
        <div className="store-card rounded p-4 mb-4">
            <h3 className="store-name fw-bold">{name}</h3>
            <p className="store-address mb-1">{address}</p>
            <p className="store-phone mb-3">Telefono: {phone}</p>
            <p className="store-hours">Orari: {hours}</p>
            <Link to={mapsLink} target="_blank" className="btn btn-primary mt-3">
                Apri su Google Maps
            </Link>
        </div>
    );
};

export default function StoresPage() {
    const stores = [
        {
            id: 1,
            name: "Negozio Roma Centro",
            address: "Via del Corso, 100 - 00186 Roma",
            phone: "+39 06 1234 5678",
            hours: "Lun-Sab: 9:00 - 19:00",
            mapsLink: "https://maps.google.com/?cid=17557292759787825576&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
        },
        {
            id: 2,
            name: "Negozio Milano Duomo",
            address: "Corso Vittorio Emanuele II, 20 - 20121 Milano",
            phone: "+39 02 8765 4321",
            hours: "Lun-Sab: 10:00 - 20:00",
            mapsLink: "https://maps.google.com/?cid=254646866614456611&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
        },
        {
            id: 3,
            name: "Negozio Napoli Vomero",
            address: "Via Alessandro Scarlatti, 50 - 80129 Napoli",
            phone: "+39 081 1234 5678",
            hours: "Lun-Dom: 9:30 - 19:30",
            mapsLink: "https://maps.google.com/?cid=15938229221100107187&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ",
        },
    ];

    return (
        <div className="sp_bg">
            <div className="p-3">
                <div className="container my-4">
                    <h1 className="text-center my-4">I nostri negozi</h1>
                    <div className="row justify-content-center">
                        {stores.map((store) => (
                            <div key={store.id} className="col-12 col-md-6 col-lg-4 mb-4">
                                <StoreCard
                                    name={store.name}
                                    address={store.address}
                                    phone={store.phone}
                                    hours={store.hours}
                                    mapsLink={store.mapsLink}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}