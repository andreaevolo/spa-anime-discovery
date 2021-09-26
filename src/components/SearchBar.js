import { useState } from "react";

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState("");
  const submitInputValue = (evt) => {
    evt.preventDefault();
    props.onInputChange(inputValue);
    setInputValue("");
  };

  const updateInputValue = (evt) => {
    setInputValue(evt.target.value);
  };
  return (
    <div id="searchbar-container">
      <form onSubmit={submitInputValue}>
        <label htmlFor="searchBar" />
        <input
          type="text"
          placeholder="Insert an anime title ..."
          value={inputValue}
          onChange={updateInputValue}
          id="searchbar"
        />
        <div className={{ marginLeft: "1em" }}>
          <button id="searchbar-btn" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
