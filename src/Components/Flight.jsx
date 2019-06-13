import React, { Component } from 'react';

export default class Flight extends Component {
  render() {
  const localDate = new Date(this.props.items.actual);
  const localeTime = localDate.getHours() + ':' + localDate.getMinutes().toString().padStart(2, '0');
  const departureDate = new Date(this.props.items.timeArrShedule || this.props.items.timeDepShedule);
  const departureTime = departureDate.getHours() + ':' + departureDate.getMinutes().toString().padStart(2, '0');
    return (
      <>
        <tr key={this.props.items.ID} className="flight">
          <td className="flight--term">
            <span className={this.props.items.term === 'A' ? 'flight-term--a' : 'flight-term--d'}>
              {this.props.items.term}
            </span>
          </td>
          {this.props.displayGate ? <td>{this.props.items.gateNo}</td> : null}
          <td>{localeTime}</td>
          <td>{this.props.items['airportToID.city_en'] ||
            this.props.items['airportFromID.city_en']}
          </td>
          {departureDate ? <td>departed at: {departureTime}</td> : 'Canceled'}
          <td>{this.props.items.airline.en.name}</td>
          <td>{this.props.items.status + this.props.items.fltNo}</td>
          <td className="flight-details"><a href="/">Flight details</a></td>
        </tr>
      </>
    )
  }
}
