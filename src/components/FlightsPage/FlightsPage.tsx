import React from 'react';
import { Header } from 'semantic-ui-react';
import './FlightsPage.scss';

const FlightsPage = () => (
  <div className="FlightsPage">
    <Header
      content="Flights table"
      className="App-Header"
      size="huge"
      color="blue"
    />
  </div>
);

export default FlightsPage;
