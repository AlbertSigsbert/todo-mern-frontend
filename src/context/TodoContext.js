import React from "react";
import { createContext, useReducer } from "react";

export const TodosContext = createContext();

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "CREATE_TODO":
      let todos = state.todos || [];
      return {
        todos: [action.payload, ...todos],
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((t) => t._id !== action.payload._id),
      };
    case "UPDATE_TODO":
    return {
      todos: state.todos.map((t) => t._id === action.payload._id ? action.payload : t)
    };

    default:
      return state;
  }
};

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: null,
  });
  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
