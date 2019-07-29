import React, { Component } from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';

import { getData } from './api/getData';
import FlightsTable from './components/FlightsTable';
import {
  TYPE_DEPARTURE,
  TYPE_ARRIVALS,
  YESTERDAY,
  TODAY,
  TOMORROW,
  YESTERDAY_NUM,
  TODAY_NUM,
  TOMORROW_NUM,
  TODAY_DATE,
  YESTERDAY_DATE,
  TOMORROW_DATE,
} from './helper';

export default class App extends Component {
  state = {
    arrivalToday: [],
    departureToday: [],

    arrivalYesterday: [],
    departureYesterday: [],

    arrivalTomorrow: [],
    departureTomorrow: [],

    currentType: TYPE_DEPARTURE,
    currentDay: YESTERDAY,
  };

  async componentDidMount() {
    const data = await getData();

    this.setState({
      arrivalYesterday: data.body.arrival.filter(
        item => item.actual.slice(8, 10) === String(YESTERDAY_NUM)
      ),
      departureYesterday: data.body.departure.filter(
        item => item.actual.slice(8, 10) === String(YESTERDAY_NUM)
      ),

      arrivalToday: data.body.arrival.filter(
        item => item.actual.slice(8, 10) === String(TODAY_NUM)
      ),
      departureToday: data.body.departure.filter(
        item => item.actual.slice(8, 10) === String(TODAY_NUM)
      ),

      arrivalTomorrow: data.body.arrival.filter(
        item => item.actual.slice(8, 10) === String(TOMORROW_NUM)
      ),
      departureTomorrow: data.body.departure.filter(
        item => item.actual.slice(8, 10) === String(TOMORROW_NUM)
      ),
    });
  }

  setCurrentType = type => this.setState({ currentType: type });

  setCurrentDay = day => this.setState({ currentDay: day });

  currentFlightsTable = (day, type) => {
    if (day === TODAY
      && type === TYPE_ARRIVALS
    ) {
      return this.state.arrivalToday;
    }

    if (day === YESTERDAY
      && type === TYPE_ARRIVALS
    ) {
      return this.state.arrivalYesterday;
    }

    if (day === TOMORROW
      && type === TYPE_ARRIVALS
    ) {
      return this.state.arrivalTomorrow;
    }

    if (day === TOMORROW
      && type === TYPE_DEPARTURE
    ) {
      return this.state.departureTomorrow;
    }

    if (day === TODAY
      && type === TYPE_DEPARTURE
    ) {
      return this.state.departureToday;
    }

    return this.state.departureYesterday;
  }

  render() {
    const { currentDay, currentType } = this.state;

    return (
      <div className="App">
        <h1>React airport</h1>

        <div className="serach-box">
          <form>
            <input
              className="search-field"
              type="text"
              placeholder="Airline, destination or flight"
            />
            <button type="button" className="search-btn">
              SEARCH
            </button>
          </form>
        </div>

        {/* TOGGLE - DEPARTURES / ARRIVALS */}

        <Tabs forceRenderTabPanel>
          <div className="toggle-type">
            <TabList>
              <Tab onClick={() => this.setCurrentType(TYPE_DEPARTURE)}>
                DEPARTURES
              </Tab>

              <Tab onClick={() => this.setCurrentType(TYPE_ARRIVALS)}>
                ARRIVALS
              </Tab>
            </TabList>
          </div>

          {/* DEPARTURES TOGGLE - YESTERDAY / TODOY / TOMORROW */}

          <TabPanel>
            <Tabs forceRenderTabPanel>
              <TabList>
                <Tab onClick={() => this.setCurrentDay(YESTERDAY)}>
                  YESTERDAY
                  <span className="toggle-table-date">
                    {YESTERDAY_DATE}
                  </span>
                </Tab>

                <Tab onClick={() => this.setCurrentDay(TODAY)}>
                  TODAY
                  <span className="toggle-table-date">{TODAY_DATE}</span>
                </Tab>

                <Tab onClick={() => this.setCurrentDay(TOMORROW)}>
                  TOMORROW
                  <span className="toggle-table-date">{TOMORROW_DATE}</span>
                </Tab>
              </TabList>

              {/* DEPARTURES TABLES */}

              <div className="flights-table">
                <TabPanel name="departures-yesterday">
                  <FlightsTable
                    currentData={this.currentFlightsTable(
                      currentDay,
                      currentType
                    )}
                    type={currentType}
                    day={currentDay}
                  />
                </TabPanel>

                <TabPanel name="departures-today">
                  <FlightsTable
                    currentData={this.currentFlightsTable(
                      currentDay,
                      currentType
                    )}
                    type={currentType}
                    day={currentDay}
                  />
                </TabPanel>

                <TabPanel name="departures-tomorrow">
                  <FlightsTable
                    currentData={this.currentFlightsTable(
                      currentDay,
                      currentType
                    )}
                    type={currentType}
                    day={currentDay}
                  />
                </TabPanel>
              </div>
            </Tabs>
          </TabPanel>

          {/* ARRIVALS TOGGLE - YESTERDAY / TODOY / TOMORROW */}

          <TabPanel>
            <Tabs forceRenderTabPanel>
              <TabList>
                <Tab onClick={() => this.setCurrentDay(YESTERDAY)}>
                  YESTERDAY
                  <span className="toggle-table-date">
                    {YESTERDAY_DATE}
                  </span>
                </Tab>

                <Tab onClick={() => this.setCurrentDay(TODAY)}>
                  TODAY
                  <span className="toggle-table-date">{TODAY_DATE}</span>
                </Tab>

                <Tab onClick={() => this.setCurrentDay(TOMORROW)}>
                  TOMORROW
                  <span className="toggle-table-date">{TOMORROW_DATE}</span>
                </Tab>
              </TabList>

              {/* ARRIVALS TABLES */}

              <div className="flights-table">
                <TabPanel name="arrivals-yesterday">
                  <FlightsTable
                    currentData={this.currentFlightsTable(
                      currentDay,
                      currentType
                    )}
                    type={currentType}
                    day={currentDay}
                  />
                </TabPanel>

                <TabPanel name="arrivals-today">
                  <FlightsTable
                    currentData={this.currentFlightsTable(
                      currentDay,
                      currentType
                    )}
                    type={currentType}
                    day={currentDay}
                  />
                </TabPanel>
                <TabPanel name="arrivals-tomorrow">
                  <FlightsTable
                    currentData={this.currentFlightsTable(
                      currentDay,
                      currentType
                    )}
                    type={currentType}
                    day={currentDay}
                  />
                </TabPanel>
              </div>
            </Tabs>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
