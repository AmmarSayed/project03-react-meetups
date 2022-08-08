import React from "react";
import { Link } from "react-router-dom";
const Products = () => {
  return (
    <section>
      <h1>The Product Page</h1>
      <ul>
        <li>
          <Link to={`/products/1`}>Book</Link>
        </li>
        <li>
          <Link to={`/products/2`}>Carpet</Link>
        </li>
        <li>
          {" "}
          <Link to={`/products/3`}>Milk</Link>
        </li>
        <li>
          {" "}
          <Link to={`/products/4`}>Online Course</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
