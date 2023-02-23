import React from "react";
import axios from "axios";
import useTodoContext from "../hooks/useTodoContext";
import useAuthContext from "../hooks/useAuthContext";

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function TodoDetails({ todo }) {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const handleUpdate = async () => {
    if (!user) {
      return;
    }

    const response = await axios.patch(
      `${baseUrl}/api/todos/${todo._id}`,
      { isCompleted: true },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );


    const json = await response.data;

    if (response.statusText === 'OK') {
      dispatch({ type: "UPDATE_TODO", payload: json });
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await axios.delete(`${baseUrl}/api/todos/${todo._id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });


    const json = await response.data;

    if (response.statusText === 'OK') {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };

  const handleShare = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/api/todos/send-invite/${todo._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;

      alert(json.message);
  
    } catch (error) {
      console.log(error);
    }
   
   
  }
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
          <span
            className="material-icons-outlined"
            onClick={() => handleUpdate(todo._id)}
          >
            check
          </span>
        )}
        <span className="material-icons-outlined" onClick={handleShare}>
          share
        </span>
        <span className="material-icons-outlined" onClick={handleDelete}>
          delete
        </span>
      </div>
    </div>
  );
}

export default TodoDetails;
