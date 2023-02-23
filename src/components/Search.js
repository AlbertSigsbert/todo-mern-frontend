import React from "react";

function Search({query, handleSearch}) {

  return (
    <form>
      <input
        type="text"
        onChange={(e) => handleSearch(e)}
        value={query}
        placeholder="Search a todo"
      />
    </form>
  );
}

export default Search;
