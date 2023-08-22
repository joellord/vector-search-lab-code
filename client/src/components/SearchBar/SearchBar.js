import React, { useState, useEffect, useRef } from "react";
import searchIcon from "../../images/search-icon.svg";
import AutoSuggestions from "../AutoSuggestions";

import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  setMovies,
  setSubmitted,
  showSuggestions,
  setShowSuggestions,
  autocompleted,
  setAutocompleted,
  searchMode,
  setSearchMode,
}) => {
  const initial = useRef(true); // a mutable variable that will not affect state - and won't trigger a re-render

  const [suggestions, setSuggestions] = useState([]);

  const TITLES_ENDPOINT = "";

  const fetchAutocompleteTitles = async (searchTerm) => {
    if (TITLES_ENDPOINT === "") {
      return;
    }
    let endpoint = TITLES_ENDPOINT;
    if (searchTerm) {
      endpoint = TITLES_ENDPOINT + `?searchTerm=${searchTerm}`;
    }
    try {
      let names = await (await fetch(endpoint)).json();
      setSuggestions(names);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("ENTERED SEARCH BAR");
    setShowSuggestions(false);
    setSubmitted(true);
  };

  useEffect(() => {
    // to skip initial render in useEffect
    if (initial.current) {
      initial.current = false;
      return;
    }

    // BUILD OUT AUTOCOMPLETE TERMS
    if (searchTerm !== "" && searchTerm.length > 3) {
      fetchAutocompleteTitles(searchTerm);

      if (suggestions.length !== 0) {
        setShowSuggestions(true);
        return;
      }
      setShowSuggestions(false);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="searchicon" />
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
          />
          <select
            onChange={ e => setSearchMode(e.target.value) }
            value={searchMode}
          >
            <option value="find">Filter Query</option>
            <option value="regex">Regex Query</option>
            <option value="search">Full-Text Search</option>
            <option value="semantic">Semantic Search</option>
          </select>
        </form>
        {showSuggestions && (
          <AutoSuggestions
            items={suggestions}
            setShowSuggestions={setShowSuggestions}
            setSuggestions={setSuggestions}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            setSubmitted={setSubmitted}
            setAutocompleted={setAutocompleted}
          />
        )}
      </Content>
    </Wrapper>
  );
};

export default SearchBar;
