import "../styles/Tags.css";

export default function Tags({ product }) {
  const animalTypes = {
    1: "cane",
    2: "gatto",
    3: "pesce",
    4: "roditore",
    5: "uccello",
  };

  return (
    <div className="mt-5">
      {(product?.animal_id ||
        product?.pet_food_necessity ||
        product?.food_type ||
        product?.age ||
        product?.weight ||
        product?.hair ||
        product?.product_weight ||
        product?.biological ||
        product?.accessories) && (
          <div className="tags">
            <ul className="list-unstyled d-flex flex-row gap-4 flex-wrap justify-content-start">
              {product?.animal_id && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">
                    {animalTypes[product.animal_id]}
                  </p>
                </li>
              )}
              {product?.pet_food_necessity && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">
                    {product.pet_food_necessity}
                  </p>
                </li>
              )}
              {product?.food_type && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">{product.food_type}</p>
                </li>
              )}
              {product?.age && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">{product.age}</p>
                </li>
              )}
              {product?.weight && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">{product.weight}</p>
                </li>
              )}
              {product?.hair && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">{product.hair}</p>
                </li>
              )}
              {product?.product_weight && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">
                    {Number(product.product_weight).toFixed(0)} kg
                  </p>
                </li>
              )}
              {product?.biological === 1 && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">Bio</p>
                </li>
              )}
              {product?.accessories === 1 && (
                <li className="tag p-2 bg-body-secondary rounded">
                  <p className="text-success my-1">Accessori</p>
                </li>
              )}
            </ul>
          </div>
        )}
    </div>
  );
}
