import React, {Component} from 'react';
import FlightRow from './FlightRow';
import FlightHead from './FlightHead';
import './FlightTable.css';

class FlightTable extends Component {
  state = {
    departure: this.props.departure,
    arrival: this.props.arrival,
    isDeparture: true,
    isArrival: false,
    viewData: this.props.departure
  };

  select = (event) => {
    const value = event.target.value;
    if (value === 'departure') {
      this.setState(prevState => {
        return {
          isDeparture: true,
          isArrival: false,
          viewData: prevState.departure
        };
      });
    }
    if (value === 'arrival') {
      this.setState(prevState => {
        return {
          isDeparture: false,
          isArrival: true,
          viewData: prevState.arrival
        };
      });
    }

  };


  render() {
    const viewData = this.state.viewData.map(flight => {
      return (
        <FlightRow flight={flight}/>
      );
    });
    const bntDepClassName = this.state.isDeparture
      ? 'air-btn-active air-btn air-btn-left'
      : 'air-btn air-btn-left';
    const bntArClassName = this.state.isArrival
      ? 'air-btn-active air-btn air-btn-right'
      : 'air-btn air-btn-right';
    return (
      <div className={'flight-board'}>
        <div>
          <div className={'air-buttons'}>
            <button onClick={this.select} value={'departure'} className={bntDepClassName}>
              DEPARTURE
            </button>
            <button onClick={this.select} value={'arrival'} className={bntArClassName}>ARRIVAL</button>
          </div>
          <table className={'flight-table'}>
            <thead >
            <FlightHead isDeparture={this.state.isDeparture}
                        isArrival={this.state.isArrival}
                        className={'flight-header'}
            />
            </thead>
            <tbody>
            {viewData}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FlightTable;
