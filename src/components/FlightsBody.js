import React from 'react';
import PropTypes from 'prop-types';
import FlightsHead from './FlightsHead';
import FlightsRow from './FlightsRow';

export default function FlightsBody(props) {
  const { currRender, data} = props;
  const rows = data.map(flightInfo => <FlightsRow 
                                        data={flightInfo} 
                                        currRender={currRender} 
                                        key={flightInfo.id} 
                                      />);

  return (
    <div className="flights-body">
      <table>
        <FlightsHead currRender={currRender} />
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

FlightsBody.propTypes = {
  currRender: PropTypes.string,
  data: PropTypes.array,
}
