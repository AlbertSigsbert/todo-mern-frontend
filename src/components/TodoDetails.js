import React from "react";
import useTodoContext from "../hooks/useTodoContext";
import useAuthContext from "../hooks/useAuthContext";

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function TodoDetails({ todo }) {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();
 
  const handleUpdate = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/todos/" + todo._id, {
      method: "PATCH",
      body: JSON.stringify({isCompleted:true}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_TODO", payload: json });
    
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/todos/" + todo._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };
  return (
    <div className="todo-details">
      <h4>{todo.title}</h4>

      <p>
        <strong>Details: </strong>
        {todo.details}
      </p>
      <p>
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
      </p>
      <p>
        <strong>isCompleted: </strong>
        {todo.isCompleted ? "Yes" : "No"}
      </p>
      <div className="icons">
        {!todo.isCompleted && (
          <span className="material-icons-outlined" onClick={() => handleUpdate(todo._id)}>
            check
          </span>
          
        )}
        <span className="material-icons-outlined" onClick={handleDelete}>
          delete
        </span>
      </div>
    </div>
  );
}

export default TodoDetails;
