import React,{ useReducer } from "react";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import useTodoContext from "../hooks/useTodoContext";

const initialState = {
  title: "",
  details: "",
  error: null,
  emptyFields: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "error":
      return {
        ...state,
        ...action,
      };
    case "success":
      return {
        title: "",
        details: "",
        error: null,
        emptyFields: [],
      };
    case "setValue":
      return {
        ...state,
        [action.field]: action.value,
      };

    default:
      return state;
  }
};

function TodoForm(props) {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  const [state, localDispatch] = useReducer(reducer, initialState);
  const { title, details, error, emptyFields } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      localDispatch({
        type: "error",
        error: "You Must Be Logged In",
      });
      return;
    }

    const todo = { title, details };

    try {
      const response = await axios.post(`${baseUrl}/api/todos`, todo, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });
  
      const json = await response.data;

      localDispatch({ type: "success" });

      dispatch({ type: "CREATE_TODO", payload: json });

    } catch (error) {
      
      localDispatch({
        type: "error",
        error: error.response.data.error,
        emptyFields: error.response.data.emptyFields,
      });
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Todo</h3>
      <label>Todo Name</label>
      <input
        type="text"
        onChange={(e) => {
          localDispatch({
            type: "setValue",
            field: "title",
            value: e.target.value,
          });
        }}
        value={title}
        className={emptyFields && emptyFields.includes("title") ? "error" : ""}
      />

    
      <label>Details</label>
      <input
        type="text"
        value={details}
        onChange={(e) => {
          localDispatch({
            type: "setValue",
            field: "details",
            value: e.target.value,
          });
        }}
        className={emptyFields && emptyFields.includes("details") ? "error" : ""}
      />

      <button>Add Todo</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default TodoForm;
