import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import './HomePage.scss';

const HomePage = () => (
  <div className="HomePage">
    <Segment
      className="HomePage-Wrapper"
    >
      <Header
        content="Welcome to the Sikorsky Airport project!"
        className="HomePage-Header"
        size="huge"
        color="blue"
      />
      <Header
        className="HomePage-Text"
        size="large"
        color="blue"
      >
        Here you can download and view the list of flights of the Sikorsky
        Airport in the form of a table for three days: yesterday, today,
        tomorrow. You can also look at the flight information and find out the
        airline’s contacts.
        The Redux library is used to store and control the state of the
        application.
      </Header>
    </Segment>
  </div>
);

export default HomePage;
