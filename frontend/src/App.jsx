import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItem from "./TodoItem";

async function fetchTodos() {
  const res = await fetch("http://localhost:3000/todos");
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

async function createTodo(title) {
  const res = await fetch("http://localhost:3000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return res.json();
}

async function toggleTodoRequest({ id, completed }) {
  const res = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed })
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return res.json();
}

async function deleteTodoRequest(id) {
  const res = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
}

function App() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [togglingId, setTogglingId] = useState(null);

  // Fetch all todos
  const { data: todos, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  // Create a todo
  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    }
  });
  // Update a todo
  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodoRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });
  // Delete a todo
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodoRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  // Action handlers
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    createTodoMutation.mutate(title);
  }

  function toggleTodo(id) {
    const todo = todos?.find((t) => t.id === id);
    if (!todo) return;

    setTogglingId(id);

    toggleTodoMutation.mutate(
      { id, completed: !todo.completed },
      {
        onSettled: () => {
          setTogglingId(null);
        }
      }
    );
  }

  function deleteTodo(id) {
    deleteTodoMutation.mutate(id);
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
          <button
            disabled={createTodoMutation.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-sm active:transform active:scale-95">
            {createTodoMutation.isPending ? "Adding..." : "Add"}
          </button>
        </form>

        <ul className="space-y-3">
          {isLoading && (
            <p className="textCenter text-slate-500 py-4 italic">
              Loading todos...
            </p>
          )}

          {isError && (
            <p className="textCenter text-red-500 py-4 italic">
              {error.message}
            </p>
          )}

          {!isLoading && !isError && todos?.length === 0 && (
            <p className="text-center text-slate-500 py-4 italic">
              No todos yet. Add one above! ✨
            </p>
          )}

          {!isLoading && !isError && todos?.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              isToggling={todo.id === togglingId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
