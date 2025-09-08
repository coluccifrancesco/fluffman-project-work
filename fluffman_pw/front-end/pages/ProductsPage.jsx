import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardItem from '../components/CardComponent/CardItem';
import '../styles/ProductPages.css';

export default function ProductsPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3030/api/products")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nel caricamento dei prodotti.");
                }
                return res.json();
            })
            .then((data) => {
                setAllProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const dogProducts = allProducts.filter(product => product.animal_id === 1);
    const catProducts = allProducts.filter(product => product.animal_id === 2);
    const fishProducts = allProducts.filter(product => product.animal_id === 3);
    const rodentProducts = allProducts.filter(product => product.animal_id === 4);
    const birdProducts = allProducts.filter(product => product.animal_id === 5);

    if (loading) {
        return <div className="text-center mt-5">Caricamento...</div>;
    }

    if (error) {
        return <div className="text-center mt-5 text-danger">Errore: {error}</div>;
    }

    return (
        <div className="hp_bg">
            <div className="p-3">
                <div className="container my-4">
                    <h1 className="text-center my-5">Tutti i nostri prodotti</h1>

                    {/* Sezione Cani */}
                    {dogProducts.length > 0 && (
                        <div className="my-5">
                            <h2 className="text-center mb-4">Cani</h2>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                                {dogProducts.map(product => (
                                    <div key={product.id} className="col">
                                        <CardItem product={product} />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/products/dogs" className="btn btn-outline-primary">Vedi tutti i prodotti per cani</Link>
                            </div>
                        </div>
                    )}

                    {/* Sezione Gatti */}
                    {catProducts.length > 0 && (
                        <div className="my-5">
                            <h2 className="text-center mb-4">Gatti</h2>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                                {catProducts.map(product => (
                                    <div key={product.id} className="col">
                                        <CardItem product={product} />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/products/cats" className="btn btn-outline-primary">Vedi tutti i prodotti per gatti</Link>
                            </div>
                        </div>
                    )}

                    {/* Sezione Pesci */}
                    {fishProducts.length > 0 && (
                        <div className="my-5">
                            <h2 className="text-center mb-4">Pesci</h2>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                                {fishProducts.map(product => (
                                    <div key={product.id} className="col">
                                        <CardItem product={product} />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/products/others" className="btn btn-outline-primary">Vedi tutti gli altri prodotti</Link>
                            </div>
                        </div>
                    )}

                    {/* Sezione Roditori */}
                    {rodentProducts.length > 0 && (
                        <div className="my-5">
                            <h2 className="text-center mb-4">Roditori</h2>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                                {rodentProducts.map(product => (
                                    <div key={product.id} className="col">
                                        <CardItem product={product} />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/products/others" className="btn btn-outline-primary">Vedi tutti gli altri prodotti</Link>
                            </div>
                        </div>
                    )}

                    {/* Sezione Uccelli */}
                    {birdProducts.length > 0 && (
                        <div className="my-5">
                            <h2 className="text-center mb-4">Uccelli</h2>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                                {birdProducts.map(product => (
                                    <div key={product.id} className="col">
                                        <CardItem product={product} />
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <Link to="/products/others" className="btn btn-outline-primary">Vedi tutti gli altri prodotti</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}