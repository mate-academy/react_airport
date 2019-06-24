import React from 'react';
import './App.scss';
import AirlineTable from './AirlineTable';
import ObjectSelectorItem from './ObjectSelectorItem';
import TimeSelector from './TimeSelector';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.flightObjects =
      [{
        key: "departure",
        name: "Departures"
      }, {
        key: "arrival",
        name: "Arrivals"
      }];

    this.state = {
      dayOffset: 0,
      flightObject: this.flightObjects[0].key,
      data: {}
    }

    this.updateData(0);
  }

  formatDate(date) {
    let dd = date.getDate() + 1;
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return `${dd}-${mm}-${yyyy}`;
  }

  updateData(dayOffset) {
    let date = new Date(Date.now());
    date.setTime(date.getTime() + dayOffset * (60 * 60 * 24 * 1000));

    return fetch(`https://api.iev.aero/api/flights/${this.formatDate(date)}`).then(data => data.json()).then(data => this.setState({
      data: data.body,
      dayOffset
    }));
  }

  changeObject(object) {
    this.setState({
      flightObject: object
    })
  }

  render() {
    return (
      <main>
        <ObjectSelectorItem changeObject={this.changeObject.bind(this)} flightObjects={this.flightObjects} state={this.state} />
        <TimeSelector changeDate={this.updateData.bind(this)} dayOffset={this.state.dayOffset} />
        {!this.state.data.isEmpty() ? <AirlineTable data={this.state.data[this.state.flightObject]} /> : null}
      </main>
    )
  }
}

Object.prototype.isEmpty = function () {
  for (let key in this) {
    if (this.hasOwnProperty(key))
      return false;
  }
  return true;
}

export default App;
