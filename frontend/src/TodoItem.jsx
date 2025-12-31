function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      className={`flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl transition-all duration-200 hover:shadow-md group ${todo.completed ? "bg-slate-50/50" : ""
        }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-colors"
      />

      <span
        className={`flex-1 text-slate-700 transition-all duration-200 ${todo.completed ? "line-through text-slate-400 decoration-slate-300" : ""
          }`}
      >
        {todo.title}
      </span>

      <button
        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all duration-200 p-1 rounded-lg hover:bg-red-50"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-0.421c.342.026.67.076.999.141m-.999-.141L18.75 16.5a2.25 2.25 0 0 1-2.25 2.25H7.5A2.25 2.25 0 0 1 5.25 16.5L4.75 8.579m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </li>
  );
}

export default TodoItem;
