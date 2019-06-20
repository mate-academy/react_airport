import React from 'react';
import { Api } from './api';
import { CreateFlightMapper, CreateDateString } from './utils';
import { BASE_URL, FLIGHT_TYPES, COLUMNS_BY_TYPE } from './constants';
import { Button } from './Button';
import { FlightRow } from './FlightRow';

const { ARRIVAL, DEPARTURE} = FLIGHT_TYPES;

export class App extends Component {
  constructor(props) {
    super(props);
    this.api = new Api(BASE_URL);

    this.state = {
      selectedDate: CreateDateString(new Date()),
      [DEPARTURE]: [],
      [ARRIVAL]: [],
      activeFlightType: DEPARTURE,
    };
  }

  componentDidMount() {
    const { selectedDate } = this.state;
    
    this.loadFlights(selectedDate);
  }

  changeActiveFlight = type => (event) => {
    event.preventDefault();

    this.setState({ activeFlightType: type})
  };

  selectDate = ({ target: { value } }) => {
    const [year, month, day] = value.split('-');
    const selectedDate = [day, month, year].join('-');
   
    this.loadFlights(selectedDate);
   
    this.setState({
      selectedDate,
      [DEPARTURE]: [],
      [ARRIVAL]: [],
    });
  };

  async loadFlights(date) {
    const data = await this.api.get(date);
    const { departure, arrival } = data.body;

    const departures = departure.map(CreateFlightMapper(DEPARTURE));
    const arrivals = arrival.map(CreateFlightMapper(ARRIVAL));
   
    this.setState({ [DEPARTURE]: departures, [ARRIVAL]: arrivals });
  }

  render() {
    const { activeFlightType, selectedDate } = this.state;

    const [year, month, day] = selectedDate.split('-');
    const pickerValue = [day, month, year].join('-');

    return (
      <div className="container">
        <div className="controls">
          <Button
            isActive={activeFlightType === DEPARTURE}
            onClick={this.changeActiveFlight(DEPARTURE)}
          >
            Departures
          </Button>

          <Button
            isActive={activeFlightType === ARRIVAL}
            onClick={this.changeActiveFlight(ARRIVAL)}
          >
            Arrivals
          </Button>
        </div>

        <div className="calendar">
          <input 
            type="date"
            value={pickerValue}
            onChange={this.selectDate}
          />
        </div>

        <table className="flights">
          <thead>
            <tr>
              {COLUMNS_BY_TYPE[activeFlightType].map((columnName) => {
                return (
                  <th key={columnName}>
                    <span>{columnName}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state[activeFlightType].map(flight => (
              <FlightRow key={flight.id} type={activeFlightType} {...flight} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

