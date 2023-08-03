import { useState } from "react";

export default function Form({ handleAddItem }) {
  const [description, setDesription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false };
    handleAddItem(newItem);
    setDesription("");
    setQuantity(1);
  };
  console.log(description);
  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item..."
          value={description}
          onChange={(e) => setDesription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
}
