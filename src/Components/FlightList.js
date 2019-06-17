import React, { Component } from 'react';
import FlightItem from './FlightItem';
import Button from './Button';
import './FlightList.css';

class FlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: [],
      arrival: [],
      display: 'departure',
      departureEvent: true
    };
    this.updateDisplayMode = this.updateDisplayMode.bind(this);
    this.tabChanger = this.tabChanger.bind(this);
  }

  componentDidMount() {
    fetch(`https://api.iev.aero/api/flights/${`${new Date()
      .toISOString()}`.split('T')[0]}`)
      .then(data => data.json())
      .then(({ body }) => {
        const { arrival, departure } = body;
        this.setState(() => ({
          arrival, departure,
        }));
      });
  }

  updateDisplayMode(stateItem) {
    this.setState({ display: stateItem });
  }

  tabChanger(event) {
    const targetButton = event.target.closest('button').dataset.tab;
    console.log(event.target.value);
    event.target.closest('button').classList.add('active');
    event.target.closest('button').disabled = true;

    switch (targetButton) {
      case 'departures':
        this.setState({
          departureEvent: true,
        });
        event.target.nextSibling.classList.remove('active');
        event.target.nextSibling.removeAttribute('disabled');
        break;
      case 'arrivals':
        this.setState({
          departureEvent: false,
        });
        event.target.previousSibling.classList.remove('active');
        event.target.previousSibling.removeAttribute('disabled');
        break;
      default:
        console.log(event);
    }
  }

  render() {
    let data = this.state[this.state.display];
    const displayGate = this.state.display === 'departure';
    return (
      <div>
        <Button updateDisplayMode={this.updateDisplayMode} display={this.state.display} tabChanger={this.tabChanger} />
        <table>
          <thead>
            <tr>
              <th>Terminal</th>
              {this.state.display === 'departure' ? <th>Gate</th> : null}
              <th>Local Time</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight </th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {data.map(item => <FlightItem item={item} key={item.ID}
              displayGate={displayGate} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FlightList; 
