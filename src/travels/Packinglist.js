import { useState } from "react";
import Item from "./Item";

export default function Packinglist({
  items,
  handleDeleteItems,
  checkListitem,
  handleDeteteAll,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sorted;
  if (sortBy === "input") sorted = items;
  if (sortBy === "description")
    sorted = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sorted = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <>
      <div className="list">
        LIST
        <ul>
          {sorted?.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDelete={handleDeleteItems}
              checkListitem={checkListitem}
            />
          ))}
        </ul>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By pACKED</option>
        </select>
        <button onClick={handleDeteteAll}>Delete</button>
      </div>
    </>
  );
}
