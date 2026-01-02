export async function fetchTodos() {
    const res = await fetch("http://localhost:3000/todos");
    if (!res.ok) {
        throw new Error("Failed to fetch todos");
    }
    return res.json();
}

export async function createTodo(title) {
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

export async function toggleTodoRequest({ id, completed }) {
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

export async function deleteTodoRequest(id) {
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        throw new Error("Failed to delete todo");
    }
}