import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]); //insert array
  }

  function handleDeleteItem(id) {
    console.log(id);

    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form addItemToList={handleAddItems} />
      <PackingList
        itemList={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onclearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
