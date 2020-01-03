import React from 'react';
import '../index.css';

function SearchField() {
  return (
    <form className="search" action>
      <input className="searchInput" />
      <div className="searchButton">
        SEARCH
      </div>
    </form>
  );
}

export default SearchField;
