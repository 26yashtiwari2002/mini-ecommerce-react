import React from "react";

function Filters({
  products,
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  clearFilters
}) {
  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="filters">
      <input
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="low">Low → High</option>
        <option value="high">High → Low</option>
      </select>

      <button onClick={clearFilters}>Clear</button>
    </div>
  );
}

export default Filters;
