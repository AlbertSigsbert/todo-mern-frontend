import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";

function useTodoContext(props) {
  const context = useContext(TodosContext);

  if (!context) {
    throw Error("useTodoContext must be used inside TodoContextProvider");
  }

  return context;
}

export default useTodoContext;
