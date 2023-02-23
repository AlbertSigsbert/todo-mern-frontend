import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

//components
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";

//hooks
import useTodoContext from "../hooks/useTodoContext";
import useAuthContext from "../hooks/useAuthContext";
import TodoFilters from "../components/TodoFilters";
import Search from "../components/Search";

function Home(props) {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(`${baseUrl}/api/todos`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;

      if (response.statusText === 'OK') {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  useEffect(() => {
    todosFilter(filter);
  }, [query]);

  function todosFilter(q) {
    if (q === "all") {
      return todos;
    } else if (q === "active") {
      return todos && todos.filter((todo) => !todo.isCompleted);
    } else if (q === "completed") {
      return todos && todos.filter((todo) => todo.isCompleted);
    } 
  }

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function todosSearch() {
    return (
      todos &&
      todos.filter(
        ({ title }) =>
          query &&
          //query.length >= 3 &&
          title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

 
  return (
    <div className="home">
      <div className="todos">
        <div className="flex-container">
          <TodoFilters filter={filter} setFilter={setFilter} />
          <Search query={query} handleSearch={handleSearch} />
        </div>

        {query
          ? todosSearch().map((todo) => <TodoDetails key={todo._id} todo={todo} />)
          : todosFilter(filter) &&
            todosFilter(filter).map((todo) => (
              <TodoDetails key={todo._id} todo={todo} />
            ))}
      </div>
      <TodoForm />
    </div>
  );
}

export default Home;
