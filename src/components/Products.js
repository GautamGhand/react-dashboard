import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        name: "dfdfdfdf",
      },
      {
        name: "fdfddfd",
      },
    ]);
  }, []);

  return (
    <>
      {products.length > 0
        ? products.map((product) => <div>{product.name}</div>)
        : "No Product Found"}
    </>
  );
}
