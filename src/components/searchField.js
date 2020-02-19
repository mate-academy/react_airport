import React from 'react';
import { Input } from 'semantic-ui-react';
import '../index.css';

function SearchField({ filterForCities, buttonFromFilter }) {
  return (
    <form className="search" action="">
      <Input
        className="searchInput"
        placeholder="Set name of the city"
        onChange={e => filterForCities(e.target.value)}
      />
      <button
        type="button"
        className="searchButton"
        onClick={() => buttonFromFilter()}
      >
        SEARCH
      </button>
    </form>
  );
}

export default SearchField;
