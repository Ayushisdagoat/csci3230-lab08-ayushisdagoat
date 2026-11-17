import { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // AI-assisted — see AI-USAGE.md #2
    if (text.trim() === "") return;
    onAdd(text.trim());
    setText("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        name="text"
        placeholder="Add a todo…"
        value={text}
        // AI-assisted — see AI-USAGE.md #1
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}