import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import Filters from "./components/Filters";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const enriched = data.map(p => ({
          ...p,
          stock: Math.floor(Math.random() * 6)
        }));
        setProducts(enriched);
        setFiltered(enriched);
      });
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (search) {
      temp = temp.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      temp = temp.filter(p => p.category === category);
    }

    if (sort === "low") {
      temp.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFiltered(temp);
  }, [search, category, sort, products]);

  const addToCart = product => {
    if (product.stock === 0) return;

    setProducts(prev =>
      prev.map(p =>
        p.id === product.id
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );

    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
     if (delta === -1) {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, stock: p.stock + 1 } : p
      )
    );
  }

  setCart(prev =>
    prev
      .map(i =>
        i.id === id ? { ...i, qty: i.qty + delta } : i
      )
      .filter(i => i.qty > 0)
  );
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("");
  };

  return (
    <div className="app-wrapper">
      <header className="header">
        <div className="logo">Mini-Ecommerce</div>
      </header>

      <div className="container">
        <Filters
          products={products}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          clearFilters={clearFilters}
        />

        <div className="layout">
          <ProductList products={filtered} addToCart={addToCart} />
          <Cart cart={cart} updateQty={updateQty} />
        </div>
      </div>
    </div>
  );
}

export default App;
