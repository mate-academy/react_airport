import React from 'react';
import FlightsHead from './FlightsHead';
import FlightsRow from './FlightsRow';

export default function FlightsBody(props) {
  const { currRender, data, changeDay } = props;
  const rows = data.map(flightInfo => <FlightsRow 
                                        data={flightInfo} 
                                        currRender={currRender} 
                                        key={flightInfo.id} 
                                      />)

  return (
    <div className="flights-body">
      <table>
        <FlightsHead currRender={currRender} changeDay={changeDay} />
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}
