import React from "react";

function TodoFilters({filter, setFilter }) {
  return (
    <div className="todo-filters">
      <button onClick={() => setFilter("all")}
      className={filter === 'all' ? "active-filter": ""}
      >All</button>
      <button onClick={() => setFilter("active")}  className={filter === 'active' ? "active-filter": ""}>Active</button>
      <button onClick={() => setFilter("completed")}  className={filter === 'completed' ? "active-filter": ""}>Completed</button>
    </div>
  );
}

export default TodoFilters;
