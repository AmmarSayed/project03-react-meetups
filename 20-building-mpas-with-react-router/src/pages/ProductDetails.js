import React from "react";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const params = useParams();

  return (
    <section>
      <h1>Product details</h1>
      <p>{params.pid}</p>
    </section>
  );
};

export default ProductDetails;
