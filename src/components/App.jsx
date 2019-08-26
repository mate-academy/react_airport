import React, { Component } from 'react';
import './App.css';
import FlightList from './FlightList';

const DEPARTURES = 'departures';
const ARRIVALS = 'arrivals';
const YESTERDAY = 'yesterday';
const TODAY = 'today';
const TOMORROW = 'tomorrow';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.data = [];

    this.state = {
      statusDate: 'today',
      statusFlight: DEPARTURES,

      yesterdayDepartures: '',
      yesterdayArrival: '',
      todayDepartures: '',
      todayArrival: '',
      tomorrowDepartures: '',
      tomorrowArrival: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  parseData([yesterday, today, tomorrow]) {
    this.setState(() => ({
      yesterdayDepartures: yesterday.body.departure,
      yesterdayArrival: yesterday.body.arrival,
      todayDepartures: today.body.departure,
      todayArrival: today.body.arrival,
      tomorrowDepartures: tomorrow.body.departure,
      tomorrowArrival: tomorrow.body.arrival
    }));
  }

  createData() {
    const date = new Date();
    const url = this.props.urlFlight;

    const dateYesterday = `${date.getDate() - 1}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const dateToday = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const dateTomorrow = `${date.getDate() + 1}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const urlDataYesterday = url + dateYesterday;
    const urlDataToday = url + dateToday;
    const urlDataTomorrow = url + dateTomorrow;

    this.data.push(urlDataYesterday, urlDataToday, urlDataTomorrow);
  }

  componentDidMount() {
    this.createData();
    this.init();
  }

  createReq(url) {
    return fetch(url).then(resp => resp.json());
  }

  getAllData(urls) {
    return Promise.all(urls.map(url => this.createReq(url)));
  }

  init() {
    this.getAllData(this.data).then(responses => this.parseData(responses));
  }

  clickHandler(event) {
    switch (event.target.id) {
      case DEPARTURES:
        this.setState(() => ({
          statusFlight: DEPARTURES
        }));
        break;
      case ARRIVALS:
        this.setState(() => ({
          statusFlight: ARRIVALS
        }));
        break;
      case YESTERDAY:
        this.setState(() => ({
          statusFlight: YESTERDAY
        }));
        break;
      case TODAY:
        this.setState(() => ({
          statusFlight: TODAY
        }));
        break;
      case TOMORROW:
        this.setState(() => ({
          statusFlight: TOMORROW
        }));
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="table-flihhts">
        <div className="departures">
          <button id="yesterday" onClick={this.clickHandler}>Yesterday</button>
          <button id="today" onClick={this.clickHandler}>Today</button>
          <button id="tomorrow" onClick={this.clickHandler}>Tomorrow</button>
          <button id="departures" onClick={this.clickHandler}>Departures</button>
          <button id="arrivals" onClick={this.clickHandler}>Arrivals</button>
        </div>
        <div className="flights">
          <div className="flights-row">
            <div className="">Terminal</div>
            <div className="">Gate</div>
            <div className="">Local time</div>
            <div className="">Destination</div>
            <div className="">Airline</div>
            <div className="">Flight</div>
            <div className="">Status</div>
          </div>

          {this.state.statusDate === YESTERDAY
            && this.state.statusFlight === DEPARTURES
            && this.state.todayArrival
            && <FlightList data={this.state.yesterdayDepartures} />}
          {this.state.statusDate === YESTERDAY
            && this.state.statusFlight === ARRIVALS
            && this.state.todayArrival
            && <FlightList data={this.state.yesterdayArrival} />}

          {this.state.statusDate === TODAY
            && this.state.statusFlight === DEPARTURES
            && this.state.todayDepartures
            && <FlightList data={this.state.todayDepartures} />}
          {this.state.statusDate === TODAY
            && this.state.statusFlight === ARRIVALS
            && this.state.todayArrival
            && <FlightList data={this.state.todayArrival} />}

          {this.state.statusDate === TOMORROW
            && this.state.statusFlight === DEPARTURES
            && this.state.todayArrival
            && <FlightList data={this.state.tomorrowDepartures} />}
          {this.state.statusDate === TOMORROW
            && this.state.statusFlight === ARRIVALS
            && this.state.todayArrival
            && <FlightList data={this.state.tomorrowArrival} />}
        </div>
        {(!this.state.yesterdayDepartures
          || !this.state.yesterdayArrival
          || !this.state.todayDepartures
          || !this.state.todayArrival
          || !this.state.tomorrowDepartures
          || !this.state.tomorrowArrival)
          && <div className="loading">Loading...</div>}
      </div>
    );
  }
}
