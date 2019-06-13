import React from 'react';
import Departure from './Departure';
import Arrival from './Arrival';
import Calendar from './Calendar';
import Tags from './Tags';
import './Schedule.css';

export default class Schedule extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      departure: [],
      arrival: [],
      date: null,
      showToday: null,
      showYesterday: null,
      showTomorrow: null,
      dateFilter: null,
      display: 'today',
    };
    this.displayChanged = this.displayChanged.bind(this);
    this.getOnClick = this.getOnClick.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getShowDate = this.getShowDate.bind(this);
  }

  componentDidMount() {
    this.getDate();
    this.getShowDate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.date !== prevState.date) {
      this.loadUrl(`https://api.iev.aero/api/flights/${this.state.date}`)
        .then(data => this.setState(state => ({
          departure: data.departure.map(item => ({
            ...item,
            timeSchedule: this.getTime(item.timeDepShedule),
            timeFact: this.getTime(item.timeTakeofFact),
          }))
            .filter(item => this.getDateTimeZone(item.timeDepShedule) === state.dateFilter)
            .sort((a, b) => a.timeSchedule.localeCompare(b.timeSchedule)),
          arrival: data.arrival.map(item => ({
            ...item,
            timeSchedule: this.getTime(item.timeToStand),
            timeFact: this.getTime(item.timeLandFact),
          }))
            .filter(item => this.getDateTimeZone(item.timeToStand) === state.dateFilter)
            .sort((a, b) => a.timeSchedule.localeCompare(b.timeSchedule)),
        })));
    }
  }

  getDate(num = 0) {
    const currentDate = new Date();
    const currentDay = currentDate.getDate() + num;
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentFullMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    this.setState({
      date: `${currentDay}-${currentFullMonth}-${currentYear}`,
      dateFilter: `${currentYear}-${currentFullMonth}-${currentDay}`,
    });
  }

  getShowDate() {
    const date = new Date();
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    this.setState({
      showToday: `${date.getDate()}/${date.getMonth()}`,
      showTomorrow: `${nextDate.getDate()}/${nextDate.getMonth()}`,
      showYesterday: `${prevDate.getDate()}/${prevDate.getMonth()}`,
    });
  }

  getTime(time) {
    const newTime = new Date(time).toTimeString().slice(0, 5);
    return newTime;
  }

  getDateTimeZone(date) {
    const newDate = new Date(date).toLocaleDateString().split('.').reverse().join('-');
    return newDate;
  }

  getOnClick(show, num) {
    this.getDate(num);
    this.displayChanged(show);
  }

  displayChanged(displayType) {
    this.setState({
      display: displayType,
    });
  }

  loadUrl(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => data.body);
  }

  render() {
    return (
      <div className="schedule">
        <Tags />
        <Calendar
          display={this.state.display}
          showYesterday={this.state.showYesterday}
          showToday={this.state.showToday}
          showTomorrow={this.state.showTomorrow}
          getOnClick={this.getOnClick}
        />
        <div id="shedule_1"><Departure flight={this.state.departure} /></div>
        <div id="shedule_2"><Arrival flight={this.state.arrival} /></div>
      </div>
    );
  }
}
