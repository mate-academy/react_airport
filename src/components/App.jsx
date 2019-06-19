import React, { Component } from 'react';
import './App.css';
import FlightList from './FlightList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.data = [];

    this.state = {
      statusDate: 'today',
      statusFlight: 'departures',

      yesterdayDepartures: '',
      yesterdayArrival: '',
      todayDepartures: '',
      todayArrival: '',
      tomorrowDepartures: '',
      tomorrowArrival: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  parseData(dataArrs) {
    this.setState(() => ({
      yesterdayDepartures: dataArrs[0].body.departure,
      yesterdayArrival: dataArrs[0].body.arrival,
      todayDepartures: dataArrs[1].body.departure,
      todayArrival: dataArrs[1].body.arrival,
      tomorrowDepartures: dataArrs[2].body.departure,
      tomorrowArrival: dataArrs[2].body.arrival
    }));
  }

  createData() {
    const date = new Date();
    const url = this.props.urlFlight;

    const dateYesterday = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const dateToday = `${date.getDate() + 1}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const dateTomorrow = `${date.getDate() + 2}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const dataYesterday = url + dateYesterday;
    const dataToday = url + dateToday;
    const dataTomorrow = url + dateTomorrow;

    this.data.push(dataYesterday, dataToday, dataTomorrow);
  }

  componentDidMount() {
    this.createData();
    this.init();
  }

  createPromise(url) {
    return fetch(url).then(resp => resp.json());
  }

  getAllData(urls) {
    return Promise.all(urls.map(url => this.createPromise(url)));
  }

  init() {
    this.getAllData(this.data).then(responses => this.parseData(responses));
  }

  clickHandler(event) {
    if (event.target.id === 'departures') {
      this.setState(() => ({statusFlight: 'departures'}));
    }
    if (event.target.id === 'arrivals') {
      this.setState(() => ({statusFlight: 'arrivals'}));
    }
    if (event.target.id === 'yesterday') {
      this.setState(() => ({statusDate: 'yesterday'}));
    }
    if (event.target.id === 'today') {
      this.setState(() => ({statusDate: 'today'}));
    }
    if (event.target.id === 'tomorrow') {
      this.setState(() => ({statusDate: 'tomorrow'}));
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

          {this.state.statusDate === 'yesterday'
            && this.state.statusFlight === 'departures'
            && this.state.todayArrival
            && <FlightList data={this.state.yesterdayDepartures} />}
          {this.state.statusDate === 'yesterday'
            && this.state.statusFlight === 'arrivals'
            && this.state.todayArrival
            && <FlightList data={this.state.yesterdayArrival} />}

          {this.state.statusDate === 'today'
            && this.state.statusFlight === 'departures'
            && this.state.todayDepartures
            && <FlightList data={this.state.todayDepartures} />}
          {this.state.statusDate === 'today'
            && this.state.statusFlight === 'arrivals'
            && this.state.todayArrival
            && <FlightList data={this.state.todayArrival} />}

          {this.state.statusDate === 'tomorrow'
            && this.state.statusFlight === 'departures'
            && this.state.todayArrival
            && <FlightList data={this.state.tomorrowDepartures} />}
          {this.state.statusDate === 'tomorrow'
            && this.state.statusFlight === 'arrivals'
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
