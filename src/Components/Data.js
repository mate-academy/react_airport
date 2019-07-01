import React, { Component } from 'react';
import ArrivalHolder from './ArrivalHolder';
import DepartHolder from './DepartHolder';

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      displayDep: true,
      displayDay: 0,
    };
    this.getDeparture = this.getDeparture.bind(this);
    this.getArrival = this.getArrival.bind(this);
    this.getTodayFlights = this.getTodayFlights.bind(this);
    this.getYesterdayFlights = this.getYesterdayFlights.bind(this);
    this.getTomorrowFlights = this.getTomorrowFlights.bind(this);
  }

  componentDidMount() {
    this.downloadData();
  }

  getDeparture() {
    this.setState({
      displayDep: true,
    });
  }

  getArrival() {
    this.setState({
      displayDep: false,
    });
  }

  getTodayFlights() {
    this.setState({
      displayDay: 0,
    });
  }

  getYesterdayFlights() {
    this.setState({
      displayDay: -1,
    });
  }

  getTomorrowFlights() {
    this.setState({
      displayDay: 1,
    });
  }

  downloadData() {
    const xhr = new XMLHttpRequest();
    const date = new Date();
    const currentMonth = `${date.getMonth() + 1}`.padStart(2, '0');
    console.log(currentMonth);
    const currentDay = `${date.getDate()}`.padStart(2, '0');
    xhr.open('GET', `https://api.iev.aero/api/flights/${currentDay}-${currentMonth}-${date.getFullYear()}`);
    let data = [];
    xhr.addEventListener('load', () => {
      data = JSON.parse(xhr.response);
      this.setState({
        data,
      });
    });
    xhr.send();
  }

  render() {
    if (this.state.data === null) {
      return (
        <h2>Buffering!</h2>
      );
    }
    const date = new Date();
    const today = date.getDate();
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getDate();
    const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const tomorrowData = {
      day: tomorrow,
      month: tomorrowDate.getMonth() + 1,
    };
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getDate();
    const yesterdayDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const yesterdayData = {
      day: yesterday,
      month: yesterdayDate.getMonth() + 1,
    };
    const currentMonth = `${date.getMonth() + 1}`.padStart(2, '0');
    const flightsDep = this.state.data.body.departure.filter((flight) => {
      switch (this.state.displayDay) {
        case 0: return +flight.timeDepShedule.slice(8, 10) === today;
        case 1: return +flight.timeDepShedule.slice(8, 10) === tomorrow;
        case -1: return +flight.timeDepShedule.slice(8, 10) === yesterday;
        default: return null;
      }
    });
    const flightsArr = this.state.data.body.arrival.filter((flight) => {
      switch (this.state.displayDay) {
        case 0: return +flight.timeArrShedule.slice(8, 10) === today;
        case 1: return +flight.timeArrShedule.slice(8, 10) === tomorrow;
        case -1: return +flight.timeArrShedule.slice(8, 10) === yesterday;
        default: return null;
      }
    });

    return (
      <>
        <div className="wraper_button">
          <div className="back"></div>
          <button  className={this.state.displayDep ? "button_dep active_button": "button_dep noactive_button"} type="button" id="departure" onClick={this.getDeparture}>DEPARTURES</button>
          <button className={this.state.displayDep ? "button_arr noactive_button": "button_arr active_button"} type="button" id="arrival" onClick={this.getArrival}>ARRIVALS</button>
        </div>
        <div className="calendar">
          <button type="button" id="yesterday" onClick={this.getYesterdayFlights}>{`${yesterday}`.padStart(2, '0')}/{`${yesterdayData.month}`.padStart(2, '0')}<br></br>YESTERDAY</button>
          <button type="button" id="today" onClick={this.getTodayFlights}>
            {today}/{currentMonth}<br></br>TODAY</button>
          <button type="button" id="tomorrow" onClick={this.getTomorrowFlights}>{`${tomorrow}`.padStart(2, '0')}/{`${tomorrowData.month}`.padStart(2, '0')}<br></br>TOMORROW</button>
        </div>
        {this.state.displayDep
          ? <div><DepartHolder data={flightsDep} /></div>
          : <div><ArrivalHolder data={flightsArr} /></div>}
      </>
    );
  }
}

export default Data;
