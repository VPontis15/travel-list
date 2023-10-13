import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onRemoveItem={handleRemoveItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSumbit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSumbit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}{" "}
          </option>
        ))}
      </select>
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        value={description}
        placeholder="Item..."
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onRemoveItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((i) => (
          <Item
            item={i}
            key={i.id}
            onToggleItem={onToggleItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onToggleItem }) {
  return (
    <li className="item">
      <form>
        <input onChange={() => onToggleItem(item.id)} type="checkbox"></input>
      </form>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
        <button onClick={() => onRemoveItem(item.id)}>❌</button>
      </span>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
