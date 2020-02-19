import React from 'react';
import {
  NavLink,
  Switch,
  Route,
} from 'react-router-dom';
import './index.css';
import { airlines } from './api/api';
import Departure from './components/departure';
import Arrival from './components/arrival';
import SearchField from './components/searchField';
import DeparturesDetails from './components/DeparturesDetails';
import ArrivalsDetails from './components/ArrivalsDetails';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrival: [],
      departure: [],
      arrivalToShow: [],
      departureToShow: [],
      details: [],
      arrivalToShowFromFilter: [],
      departureToShowFromFilter: [],
    };
  }

  componentDidMount() {
    this.airlinesScadule();
  }

  airlinesScadule = async() => {
    const scadule = await airlines();

    // console.log(scadule);
    this.setState({
      arrival: this.setRightTime(scadule.body.arrival),
      departure: this.setRightTime(scadule.body.departure),
    });
  }

  setRightTime = (arr) => {
    const arr2 = arr;
    const arr1 = arr.map(item => new Date(item.timeToStand).toLocaleString());

    for (let i = 0; i < arr.length; i++) {
      arr2[i].timeToStand = arr1[i];
    }

    return arr2;
  };

  today = () => new Date().toLocaleDateString('uk-UA');

  yesterday = () => new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString('uk-UA');

  tomorrow = () => new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('uk-UA');

  activeDay = (day) => {
    switch (day) {
      case 'YESTERDAY':
        this.setState(prevSate => ({
          ...prevSate,
          arrivalToShow: [...prevSate.arrival]
            .filter(item => new Date(item.timeToStand).toLocaleDateString('uk-UA') === this.yesterday()),
          departureToShow: [...prevSate.departure]
            .filter(item => new Date(item.timeToStand).toLocaleDateString('uk-UA') === this.yesterday()),
        }));
        break;
      case 'TODAY':
        this.setState(prevSate => ({
          ...prevSate,
          arrivalToShow: [...prevSate.arrival]
            .filter(item => new Date(item.timeToStand).toLocaleDateString('uk-UA') === this.today()),
          departureToShow: [...prevSate.departure]
            .filter(item => new Date(item.timeToStand).toLocaleDateString('uk-UA') === this.today()),
        }));
        break;
      case 'TOMORROW':
        this.setState(prevSate => ({
          ...prevSate,
          arrivalToShow: [...prevSate.arrival]
            .filter(item => new Date(item.timeToStand).toLocaleDateString('uk-UA') === this.tomorrow()),
          departureToShow: [...prevSate.departure]
            .filter(item => new Date(item.timeToStand).toLocaleDateString('uk-UA') === this.tomorrow()),
        }));
        break;
      default:
        this.setState(prevSate => ({
          ...prevSate,
          arrivalToShow: [...prevSate.arrival]
            .filter(item => new Date(item.timeToStand).toLocaleDateString('uk-UA') === this.today()),
          departureToShow: [...prevSate.departure]
            .filter(item => new Date(item.timeToStand).toLocaleDateString('uk-UA') === this.today()),
        }));
    }
  }

  setItemForDetails = (item) => {
    this.setState(prevState => ({
      ...prevState,
      details: item,
    }));
  };

  filterForCities = (e) => {
    this.setState(prevSate => ({
      ...prevSate,
      arrivalToShowFromFilter: [...prevSate.arrivalToShow]
        .filter(item => item['airportFromID.city_en'].toLowerCase().includes(e.toLowerCase())),
      departureToShowFromFilter: [...prevSate.departureToShow]
        .filter(item => item['airportToID.city_en'].toLowerCase().includes(e.toLowerCase())),
    }));
  };

  buttonFromFilter = () => {
    this.setState(prevSate => ({
      ...prevSate,
      arrivalToShow: prevSate.arrivalToShowFromFilter,
      departureToShow: prevSate.departureToShowFromFilter,
    }));
  }

  render() {
    const { departureToShow, arrivalToShow, details } = this.state;

    return (
      <div className="App">
        <Switch>
          {details.map(item => (
            <Route path="/arrivalsDetails" exact>
              <ArrivalsDetails
                logo={item.airline.en.logoName}
                number={item.fltNo}
                from={item['airportFromID.name_en']}
                terminal={item.term}
                planeNo={item.planeNo}
                planeType={item['planeTypeID.name']}
                arrivalTime={
                  new Date(item.timeToStand).toLocaleTimeString('uk-UA')
                }
              />
            </Route>
          ))}
          {details.map(item => (
            <Route path="/departuresDetails" exact>
              <DeparturesDetails
                logo={item.airline.en.logoName}
                number={item.fltNo}
                to={item['airportToID.name_en']}
                terminal={item.term}
                planeNo={item.planeNo}
                planeType={item['planeTypeID.name']}
                arrivalTime={
                  new Date(item.timeToStand).toLocaleTimeString('uk-UA')
                }
              />
            </Route>
          ))}

          <Route path="/">
            <SearchField
              filterForCities={this.filterForCities}
              buttonFromFilter={this.buttonFromFilter}
            />

            <div className="tableAndButtons">
              <div className="buttons">
                <NavLink
                  to="/departures"
                  exact
                  activeClassName="activeButton"
                  className="button aName"
                >
                Departures
                </NavLink>

                <NavLink
                  to="/arrivals"
                  exact
                  activeClassName="activeButton"
                  className="button aName"
                >
                Arrivals
                </NavLink>
              </div>

              <Route
                path="/arrivals/:day?"
                render={props => (
                  <Arrival
                    {...props}
                    arrival={arrivalToShow}
                    activeDay={this.activeDay}
                    yesterday={this.yesterday}
                    today={this.today}
                    tomorrow={this.tomorrow}
                    setItemForDetails={this.setItemForDetails}
                  />
                )}
              />

              <Route
                path="/departures/:day?"
                render={props => (
                  <Departure
                    {...props}
                    departure={departureToShow}
                    activeDay={this.activeDay}
                    yesterday={this.yesterday}
                    today={this.today}
                    tomorrow={this.tomorrow}
                    setItemForDetails={this.setItemForDetails}
                  />
                )}
              />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
