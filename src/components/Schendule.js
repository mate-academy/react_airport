import React, { Component } from 'react';
import FlightList from './FlightList';
import './Schendule.css';

export default class Schendule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departuresState: true,
      departures: [],
      arrivals: [],
      currentDate: this.getCurrentDate(),
      dateForLink: this.dateForLink(),
    };
    this.changeTab = this.changeTab.bind(this);
  }

  loadApi(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => data);
  }

  loadItems() {
    Promise.all([
      this.loadApi(`https://api.iev.aero/api/flights/${this.state.dateForLink}`),
    ])
      .then(([flights]) => {
        this.setState({
          departures: flights.body.departure,
          arrivals: flights.body.arrival,
        });
      });
  }

  changeTab(event) {
    const targetTab = event.target.closest('button').dataset.tab;
    event.target.closest('button').classList.add('active');

    switch (targetTab) {
      case 'departures':
        event.target.nextSibling.classList.remove('active');
        this.setState({
          departuresState: true,
        });
        break;
      case 'arrivals':
        event.target.previousSibling.classList.remove('active');
        this.setState({
          departuresState: false,
        });
        break;
      default:
        console.log('Lint wanted default case');
    }
  }

  monthAndDayView(date) {
    const dayAndMonth = [date.getDate(), date.getMonth() + 1];

    return dayAndMonth.map(elem => elem < 10 ? (`0${elem}`) : elem);
  }

  getCurrentDate() {
    const currentDate = new Date();
    const [day, month] = [...this.monthAndDayView(currentDate)];

    return `${day} / ${month}`;
  }

  dateForLink() {
    const date = new Date();
    const [day, month] = [...this.monthAndDayView(date)];

    return `${day}-${month}-${date.getFullYear()}`;
  }

  render() {
    this.loadItems();
    const departureText = 'Departed at ';
    const arrivalText = 'Landed ';
    const displayGate = false;

    return (
      <section className="schendule">
        <div className="buttons">
          <button
            type="button"
            className="active departure"
            data-tab="departures"
            onClick={this.changeTab}
          >
            DEPARTURES
          </button>
          <button
            type="button"
            className="arrive"
            data-tab="arrivals"
            onClick={this.changeTab}
          >
            ARRIVALS
          </button>
        </div>
        <div className="dates">
          <span className="day">
            <div className="date">
              11 / 06
            </div>
            YESTERDAY
          </span>
          <span className="day active">
            <div className="date">
              {this.state.currentDate}
            </div>
            TODAY
          </span>
          <span className="day">
            <div className="date">
              13 / 06
            </div>
            TOMORROW
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Terminal</th>
              {this.state.departuresState ? <th>Gate</th> : null}
              <th>Local time</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight</th>
              <th>-</th>
            </tr>
          </thead>
          {this.state.departuresState
            ? (
              <FlightList
                data={this.state.departures}
                text={departureText}
                date={this.currentDate}
              />
            )
            : (
              <FlightList
                data={this.state.arrivals}
                departuresState={displayGate}
                text={arrivalText}
                date={this.currentDate}
              />
            )
          }
        </table>
      </section>
    );
  }
}
