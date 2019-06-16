import React, { Component } from 'react';
import { FLIGHT_TYPES, BASE_URL_API } from './constants';
import { createFlightMapper, createDateString } from './utils';
import FlightsBody from './components/FlightsBody';
import FlightsButtons from './components/FlightsButtons';
import './App.css'

const { DEPARTURE, ARRIVAL } = FLIGHT_TYPES;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depatrure: [],
      arrival: [],
      loaded: null,
      currRender: DEPARTURE,
      currDate: new Date(),
    }

    this.toggleRender = this.toggleRender.bind(this);
    
  }

  toggleRender(type) {
    const { currRender } = this.state;
    
    if (type === DEPARTURE && currRender !== DEPARTURE) {
      this.setState({
        currRender: DEPARTURE
      })
    }

    if (type === ARRIVAL && currRender !== ARRIVAL) {
      this.setState({
        currRender: ARRIVAL
      })
    }
    
  }

  getFlightsFromApi() {
    const { currDate } = this.state;
    const dateNowNormilize = createDateString(currDate);
    const url = `${BASE_URL_API}${dateNowNormilize}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { departure, arrival } = data.body;
        const departures = departure.map(createFlightMapper(DEPARTURE));
        const arrivals = arrival.map(createFlightMapper(ARRIVAL));

        this.setState({
          departure: departures,
          arrival: arrivals,
          loaded: true,
        })
      })
  }

  componentDidMount() {
    this.getFlightsFromApi();
  }

  render() {
    const { 
      loaded,
      departure,
      arrival,
      currRender
    } = this.state;
    
    if (!loaded) {
      return (
        <div className="loader">
          <div className="load"></div>
        </div>
      )
    } else {
      return (
        <div className="main">
          <div className="wrapper">
            <div className="buttons">
              <FlightsButtons toggler={this.toggleRender} currRender={currRender} />
            </div>
            <FlightsBody currRender={currRender}
              data={currRender === DEPARTURE
                ? departure : arrival}
              changeDay={this.changeDay}
            />
          </div>
        </div>
      )
    }
  }
}
