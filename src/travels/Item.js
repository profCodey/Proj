export default function  Item({ item, onDelete, checkListitem }) {
  return (
    <>
      <li>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          <input
            type="checkbox"
            value={item.packed}
            onChange={() => {
              checkListitem(item.id);
            }}
          />
          {item.quantity}
          {item.description}
        </span>
        <button onClick={() => onDelete(item.id)}>❌</button>
      </li>
    </>
  );
}
