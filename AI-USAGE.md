# AI-USAGE.md — Lab 08

This is the **one lab where you may use an AI agent to *generate* code** (it follows the
week-8 AI lecture). With that permission comes documentation: log **every** time AI
produced or edited code you submit — **before** you commit it. Using AI only to *learn*
(explanations, error messages, design talk) needs no entry.

**Free models only.** Drop a marker where AI-assisted code lives:
`// AI-assisted — see AI-USAGE.md #N`. Full rules: `project/ai-policy.md`.

---

## Log (one entry per AI use — copy the block for each)

### #1 — Fix input spacing bug in AddTodoForm
- **Date:** 2026-11-16
- **Tool / model:** Gemini (free tier)
- **Files:** `src/AddTodoForm.jsx`
- **Prompt (verbatim):** 



  ```
  
  This is my code. When I type my input I am unable to add spaces. for example if I want to type To Do i can only write it as todo, TODO,ToDo.
  
  import { useState } from "react";

  export default function AddTodoForm({ onAdd }) {
    const [text, setText] = useState("");

    function handleSubmit(event) {
      event.preventDefault();
      onAdd(text.trim());
      setText("");
    }

    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          name="text"
          placeholder="Add a todo…"
          value={text}
          onChange={(e) => setText(e.target.value.trim())}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
  ```

- **What it produced & what I kept / changed / rejected:** The assistant pointed out that calling `.trim()` inside `onChange` immediately stripped spaces as I typed, so I removed `.trim()` from `onChange` (`onChange={(e) => setText(e.target.value)}`) while keeping `text.trim()` inside `handleSubmit`. This works because spaces are preserved while typing and only trimmed upon submission.

---

### #2 — Prevent adding empty todos in AddTodoForm
- **Date:** 2026-11-16
- **Tool / model:** Gemini (free tier)
- **Files:** `src/AddTodoForm.jsx`
- **Prompt (verbatim):**

  ```
  Clicking Add with an empty input adds a blank todo same code
  ```

- **What it produced & what I kept / changed / rejected:** The assistant added a guard clause (`if (text.trim() === "") return;`) at the top of `handleSubmit`, which I kept (without the extra comment it added). This ensures empty or whitespace-only inputs exit early before `onAdd` is called.

---

### #3 — Fix Active and Completed filter logic in App
- **Date:** 2026-11-16
- **Tool / model:** Gemini (free tier)
- **Files:** `src/App.jsx`
- **Prompt (verbatim):**

  ```
  My Active and Completed filters show the wrong todos
  here is my code for app.jsx

  import { useState } from "react";
  import TodoList from "./TodoList.jsx";
  // Step 3: create AddTodoForm.jsx, then import and use it below.
  // import AddTodoForm from "./AddTodoForm.jsx";
  import AddTodoForm from "./AddTodoForm.jsx";

  const INITIAL_TODOS = [
    { id: 1, text: "Read the lab README", done: true },
    { id: 2, text: "Build the to-do list", done: false },
    { id: 3, text: "Add one of your own", done: false },
  ];

  export default function App() {
    // Right now the list is STATIC. Your job is to make it live.
    //
    // Step 1: hold the todos in state instead of a constant:
    //   const [todos, setTodos] = useState(INITIAL_TODOS)
    const [todos, setTodos] = useState(INITIAL_TODOS);
    const [filter, setFilter] = useState("all");

    // Step 2: write these handlers. They must NOT mutate state - build a NEW
    // array each time (spread / map / filter) and pass it to setTodos:
    //   addTodo(text)   → append { id, text, done: false }  (give it a fresh id)
    //   toggleTodo(id)  → flip `done` on the matching todo
    //   deleteTodo(id)  → drop the matching todo
    // Then pass them as props to the components below.
    function addTodo(text) {
      const id = Math.max(0, ...todos.map((t) => t.id)) + 1;
      setTodos([...todos, { id, text, done: false }]);
    }

    function toggleTodo(id) {
      setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    }

    function deleteTodo(id) {
      setTodos(todos.filter((t) => t.id !== id));
    }

    function clearCompleted() {
      setTodos(todos.filter((t) => t.done));
    }

    const visible = todos.filter((t) =>
      filter === "active" ? t.done : filter === "completed" ? !t.done : true,
    );

    const done = todos.filter((t) => t.done).length;
    const total = todos.length;

    return (
      <main className="app">
        <h1>My To-Dos</h1>
        {/* Step 3: <AddTodoForm onAdd={addTodo} /> */}
        <AddTodoForm onAdd={addTodo} />
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
        <TodoList todos={visible} onToggle={toggleTodo} onDelete={deleteTodo} />
        {/* Step 4: a derived count - "{done} of {total} done" computed from todos */}
        <p className="count">
          {done} of {total} done
        </p>
        <button className="clear" onClick={clearCompleted}>
          Clear completed
        </button>
      </main>
    );
  }
  ```

- **What it produced & what I kept / changed / rejected:** The assistant flipped the boolean checks in `visible` to `filter === "active" ? !t.done : filter === "completed" ? t.done : true`, which I kept because `"active"` items are not done (`!t.done`) and `"completed"` items are done (`t.done`). I rejected the assistant's initial removal of the starter lab comments and had it restore them verbatim.

---

### #4 — Fix clearCompleted filtering logic in App
- **Date:** 2026-11-16
- **Tool / model:** Gemini (free tier)
- **Files:** `src/App.jsx`
- **Prompt (verbatim):**

  ```
  “Clear completed” deletes my unfinished todos instead of the completed ones.
  ```

- **What it produced & what I kept / changed / rejected:** The assistant updated `clearCompleted` to `setTodos(todos.filter((t) => !t.done))`, which I kept. Filtering with `!t.done` retains only incomplete todos and removes the completed ones.

---

## Reflection (required)

- **What did the agent get wrong, or do awkwardly?** On the third prompt, the assistant stripped out all the starter lab instruction comments and added its own inline comments, which I had to ask it to undo. It also jumped ahead and fixed `clearCompleted` before I specifically asked about that bug.

- **Explain-every-line check:** I can explain every line of the AI-assisted code in this
  lab and why it's correct. ☑  *(Your TA may ask you to walk through any of it.)*