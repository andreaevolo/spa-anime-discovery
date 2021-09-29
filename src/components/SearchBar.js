import { useState } from "react";

const SearchBar = (props) => {
  const [validInput, setValidInput]= useState(true);
  const [inputValue, setInputValue] = useState("");
  const submitInputValue = (evt) => {
    evt.preventDefault();
    if(!inputValue) {
      setValidInput(false);
    } else {
      props.onInputChange(inputValue);
      setInputValue("");
      setValidInput(true);
    }
  };

  const updateInputValue = (evt) => {
    
    setInputValue(evt.target.value);
  };

  return (
    <div id="searchbar-container">
      <form onSubmit={submitInputValue}>
        <label htmlFor="searchBar" />
        <input
          className={`searchbar-input ${!validInput ? 'searchbar-error' : null}`}
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
