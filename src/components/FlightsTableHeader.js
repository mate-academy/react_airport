import React from 'react';
import PropTypes from 'prop-types';

const FlightsTableHeader = props => (
  <thead>
    <tr>
      <th>
        <button
          name="Terminal"
          onClick={props.sortTable}
          className="header-cell__title-wrapper"
          type="button"
        >
          Terminal
        </button>
      </th>

      <th>

        <button
          name="Local time"
          onClick={props.sortTable}
          className="header-cell__title-wrapper"
          type="button"
        >
          Local time
        </button>
      </th>

      <th>

        <button
          name="Destination"
          onClick={props.sortTable}
          className="header-cell__title-wrapper"
          type="button"
        >
          Destination
        </button>
      </th>

      <th>

        <button
          name="Status"
          onClick={props.sortTable}
          className="header-cell__title-wrapper"
          type="button"
        >
          Status
        </button>
      </th>

      <th>

        <button
          name="Airline"
          onClick={props.sortTable}
          className="header-cell__title-wrapper"
          type="button"
        >
            Airline
        </button>
      </th>

      <th>

        <button
          name="Flight"
          onClick={props.sortTable}
          className="header-cell__title-wrapper"
          type="button"
        >
            Flight
        </button>
      </th>

      <th>

        <button
          name="unSort"
          onClick={props.sortTable}
          className="
            header-cell__title-wrapper
            header-cell__title-wrapper--unsort
          "
          type="button"
        />
      </th>

    </tr>

  </thead>
);

FlightsTableHeader.propTypes = {
  sortTable: PropTypes.func.isRequired,
};

export default FlightsTableHeader;
