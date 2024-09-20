import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        id:1,
        name: "dfdfdfdf",
      },
      {
        id:2,
        name: "fdfddfd",
      },
    ]);
  }, []);

  return (
    <>
      {products.length > 0
        ? products.map((product) => <div key={product.id}>{product.name}</div>)
        : "No Product Found"}
    </>
  );
}
