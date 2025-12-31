import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched todos:", data);
        setTodos(data);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((newTodo) => {
        setTodos((prev) => [...prev, newTodo]);
        setTitle("");
      })
      .catch(console.error);
  }

  async function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });

    const updatedTodo = await res.json();

    setTodos((prev) =>
      prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
    );
  }

  async function deleteTodo(id) {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center tracking-tight">
          My Tasks
        </h1>

        <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm active:transform active:scale-95">
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-slate-500 py-4 italic">No todos yet. Add one above! ✨</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
