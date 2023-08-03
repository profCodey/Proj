import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import Packinglist from "./Packinglist";
import Stats from "./Stats";
import "./index.css";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Socks", quantity: 12, packed: false },
];

export function Travels() {
  const [items, setItem] = useState(initialItems);

  const handleAddItem = (newItem) => {
    setItem((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItems = (id) => {
    setItem((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const handleCheckItem = (id) => {
    setItem((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleDeteteAll = () => {
    const confirmed = window.confirm("Are you sure you want to delete all?");

    if (confirmed) setItem(() => []);
  };

  return (
    <div>
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <Packinglist
        items={items}
        handleDeleteItems={handleDeleteItems}
        checkListitem={handleCheckItem}
        handleDeteteAll={handleDeteteAll}
      />
      <Stats items={items} />
    </div>
  );
}

export default Travels;
