import React, { Component } from 'react';

export default class FlightItem extends Component {

  render() {
    // console.log(this.props.item);
    const localDate = new Date(this.props.item.actual);
    const localeTime = localDate.getHours() + ':' + localDate.getMinutes().toString().padStart(2, '0');
    const timeArrSheduleDate = new Date(this.props.item.timeArrShedule || this.props.item.timeDepShedule);
    const timeArrShedule = timeArrSheduleDate.getHours() + ':' + localDate.getMinutes().toString().padStart(2, '0');


    return (
      <tr>
        <td>{this.props.item.term}</td>
        {this.props.displayGate ? <td>{this.props.item.gateNo}</td> : null}
        <td>{localeTime}</td>
        <td>{this.props.item['airportFromID.city_en'] || this.props.item['airportToID.city_en']}</td>
        {timeArrSheduleDate ? <td>{timeArrShedule}</td> : 'Canceled'}
        <td>{this.props.item.airline.en.name}</td>
        <td>{this.props.item.status + this.props.item.fltNo}</td>
      </tr>
    )
  }
}