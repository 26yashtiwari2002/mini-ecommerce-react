import React from "react";

function Cart({ cart, updateQty }) {
  const totalItems = cart.reduce((a, b) => a + b.qty, 0);
  const totalPrice = cart.reduce((a, b) => a + b.qty * b.price, 0);

  return (
    <div className="cart">
      <h3>Cart</h3>

      {cart.length === 0 && <p>Empty cart</p>}

      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div className="cart-title">{item.title}</div>

          <div className="cart-controls">
            <button onClick={() => updateQty(item.id, -1)}>-</button>
            <span className="cart-qty">{item.qty}</span>
            <button
              onClick={() =>
                item.qty < item.stock && updateQty(item.id, 1)
              }
            >
              +
            </button>
          </div>
        </div>
      ))}

      <p>Total Items: {totalItems}</p>
      <p>Total Price: ₹ {totalPrice.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
