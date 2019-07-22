import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filterInput, handleFilterTyping }) => (
  <form onSubmit={event => event.preventDefault()}>
    <input
      type="text"
      name="filterInput"
      value={filterInput}
      onChange={handleFilterTyping}
      className="filter"
      placeholder="Filtering by airline, destination or flight"
      autoComplete="off"
    />
  </form>
);

Filter.propTypes = {
  filterInput: PropTypes.string.isRequired,
  handleFilterTyping: PropTypes.func.isRequired,
};

export default Filter;
