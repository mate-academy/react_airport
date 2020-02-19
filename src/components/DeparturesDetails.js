import React from 'react';
import { Button } from 'semantic-ui-react';
import '../index.css';
import { NavLink } from 'react-router-dom';

function DeparturesDetails({
  logo, number, to, terminal, planeNo, planeType, arrivalTime
}) {
  return (
    <>
      <NavLink to="/" exact>
        <Button type="button">HOME!</Button>
      </NavLink>
      <img alt="logo" src={logo} />
      <p>
        {`Number of flight: ${number}`}
      </p>
      <p>
        {`Flight from: ${to}`}
      </p>
      <p>
        {`Terminal: ${terminal}`}
      </p>
      <p>
        {`Number of plane: ${planeNo}`}
      </p>
      <p>
        {`Type of plane: ${planeType}`}
      </p>
      <p>
        {`Arrival time: ${arrivalTime}`}
      </p>
    </>
  );
}

export default DeparturesDetails;
