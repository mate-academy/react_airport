import React, { Component } from 'react';

export default class Flight extends Component {
  render() {
    const data = this.props.data;
    const date = (data.timeArrShedule || data.timeDepShedule);
    const newDate = new Date(date);
    return (
      <div className="flights-row">
        <div>{data.term}</div>
        <div>{data.gateNo || '-'}</div>
        <div>{`${newDate.getHours()}`.padStart(2, '0')}:{`${newDate.getMinutes()}`.padStart(2, '0')}</div>
        <div>{data['airportToID.name_en'] || data['airportFromID.name_en']}</div>
        <div>{data.airline.en.name}</div>
        <div>{data['carrierID.IATA'] || '-'}</div>
        <div>{data['status']}</div>
      </div>
    );
  }
}
