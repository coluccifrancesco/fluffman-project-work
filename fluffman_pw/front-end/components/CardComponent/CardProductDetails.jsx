export default function CardProductDetail() {
    return (
        <>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="..." className="img-fluid rounded-start" alt="product_img" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="product_name">Nome del prodotto</h5>
                            <p className="producer">Nome dell'azienda produttrice</p>
                            <p className="price">Prezzo del prodotto</p>
                        </div>
                        <div className="card_bottom">
                            <p>Descrizione del Prodotto: Lorem ipsum dolor sit amet consectetur adipisicing elit. Et molestiae voluptatem fuga repudiandae nihil aspernatur a laborum pariatur enim. A, laboriosam libero sapiente earum quidem vitae ex reiciendis itaque ea.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}