import React from 'react';
import './FlightHead.css';

function FlightHead(props) {
  const {isDeparture, isArrival} = props;
  const departureFields = ['Terminal','Gate', 'Time', 'Destination','Airline', 'Flight', 'Status', ''];
  const arrivalFields = ['Terminal', 'Time', 'Destination','Airline', 'Flight', 'Status', ''];
  function toHeader(fields) {
    return (
      <tr className={'flight-header'}>
        {
          fields.map(field => {
            return (
              <td className={field.toLowerCase()}>
                {field}
              </td>
            );
          })
        }
      </tr>
    );
  }
  if(isDeparture) {
    return toHeader(departureFields);
  }
  if(isArrival) {
    return toHeader(arrivalFields);
  }
}

export default FlightHead;
