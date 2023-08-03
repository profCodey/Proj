export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <p>There is currently no item in your list</p>
      </footer>
    );

  const itemsLength = items.length;
  const packedLength = items.filter((item) => item.packed).length;
  const percentage = (packedLength / itemsLength) * 100;
  console.log(percentage);

  return (
    <>
      <footer className="stats">
        <em>
          {percentage === 100
            ? "You have got everything. Ready to go✈️"
            : `📝You have ${itemsLength} items in your list, and you have already
          packed ${packedLength} (${Math.round(percentage)}%)`}
        </em>
      </footer>
    </>
  );
}
