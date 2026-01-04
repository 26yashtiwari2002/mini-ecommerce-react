import React from "react";

function ProductCard({ product, addToCart }) {
  const shortDesc =
    product.description.length > 80
      ? product.description.slice(0, 80) + "..."
      : product.description;

  const stars = Math.round(product.rating.rate);

  return (
    <div className="card">
      <img
        src={product.image}
        alt={product.title}
        className="product-img"
      />

      <h4 className="title">{product.title}</h4>

      <p className="category">{product.category}</p>

      <p className="desc">{shortDesc}</p>

      <div className="rating">
        {"★".repeat(stars)}
        {"☆".repeat(5 - stars)}
        <span className="count"> ({product.rating.count})</span>
      </div>

      <p className="price">₹ {product.price}</p>

      <p className={product.stock > 0 ? "stock in" : "stock out"}>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      <button
        disabled={product.stock === 0}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
