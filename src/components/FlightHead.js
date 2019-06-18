import React from 'react';
import './FlightHead.css';

const departureFields = ['Terminal', 'Gate', 'Time', 'Destination', 'Airline', 'Flight', 'Status', ''];
const arrivalFields = ['Terminal', 'Time', 'Destination', 'Airline', 'Flight', 'Status', ''];

function FlightHead(props) {
  const { isDeparture } = props;
  const fields = isDeparture
    ? departureFields
    : arrivalFields;
  return (
    <tr className="flight-header">
      {
        fields.map((field) => {
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

export default FlightHead;
