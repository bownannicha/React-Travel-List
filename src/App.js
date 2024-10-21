import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  { id: 4, description: "Sunglasses", quantity: 1, packed: false },
  { id: 5, description: "Jeans", quantity: 3, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]); //insert array
  }
  return (
    <div className="app">
      <Logo />
      <Form addItemToList={handleAddItems} />
      <PackingList itemList={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away 🧳</h1>;
}

function Form({ addItemToList }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    // e: event to be handle
    e.preventDefault(); // prevent reload

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    addItemToList(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? ☺</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          // console.log(e.target);
          // console.log(e.target.value);

          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function PackingList({ itemList }) {
  return (
    <div className="list">
      <ul>
        {itemList.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em> You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
