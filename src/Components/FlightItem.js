import React, { Component } from 'react';

export default class FlightItem extends Component {
  
  render() {
    // console.log(this.props.arrival);
    const localDate = new Date(this.props.arrival.actual);
    const localeTime = localDate.getHours() + ':' + localDate.getMinutes().toString().padStart(2, '0');
    const timeArrSheduleDate = new Date(this.props.arrival.timeArrShedule);
    const timeArrShedule = timeArrSheduleDate.getHours() + ':' + localDate.getMinutes().toString().padStart(2, '0')


    return (
      <tr>
        <td>{this.props.arrival.term}</td> {/*Terminal*/}
        {this.props.arrival.geteNo ? <td>{this.props.arrival.geteNo}</td> : null} {/*LocalTime*/}
        <td>{localeTime}</td> {/*Flight*/} {/*LocalTime*/}
        <td>{this.props.arrival['airportFromID.city_en']}</td> {/*Destination*/}
        <td>Departed at: {timeArrShedule}</td> {/*	Status*/}
        <td>{this.props.arrival.airline.en.name}</td> {/*Airline*/}
         <td>{this.props.arrival.status}</td> {/*Flight*/}
      </tr>
    )
  }
}
