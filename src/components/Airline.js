import React from 'react';

function Airline(props) {
  return (
    <td>
      <ul>
        {props.flight.codeShareData
          .map((item) => {
            return (
              <li key={item.codeShare}>
                <img src={item.airline.en.logoSmallName} alt={item.airline.en.name} />
                <p>{item.airline.en.name}</p>
              </li>
            );
          })
        }
      </ul>
    </td>
  );
}

export default Airline;
