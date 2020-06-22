import React, { useEffect } from 'react';
import {
  Route,
  NavLink,
  withRouter,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'semantic-ui-react';
import * as selectors from '../../store';
import DirectionBtn from '../DirectionBtn';
import FlightsTable from '../FlightsTable';
import Spinner from '../common/Spinner';
import './FlightsPage.scss';

type TabsConfig = {
  id: number;
  name: string;
};

const tabsConfig: TabsConfig[] = [
  { id: 1, name: 'yesterday' },
  { id: 2, name: 'today' },
  { id: 3, name: 'tomorrow' },
];

const FlightsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.getLoading);
  const loaded = useSelector(selectors.getLoaded);
  const error = useSelector(selectors.getError);
  const history = useHistory();
  const match = useRouteMatch('/flights');

  useEffect(() => {
    dispatch(selectors.loadFlights());
  }, [dispatch]);

  useEffect(() => {
    if (match?.isExact) {
      history.push({ pathname: '/flights/today' });
    }
  }, [match, history]);

  return (
    <div className="FlightsPage">
      {loading && !loaded ? (
        <Spinner />
      ) : (
        <>
          <Header
            className="FlightsPage-Header"
            content="Flights table"
            color="blue"
            size="huge"
          />
          <Header
            className="FlightsPage-Error"
            content={error}
            color="red"
            as="h2"
          />
          <DirectionBtn />
          <div className="FlightsPage-Tabs ui attached menu blue">
            {tabsConfig.map(({ id, name }: TabsConfig) => (
              <NavLink
                key={id}
                className="FlightsPage-Link item"
                activeClassName="FlightsPage-Link_active"
                to={`${match?.path}/${name}`}
              >
                {name}
              </NavLink>
            ))}
          </div>
          <Route path={`${match?.path}/:currentDay/:flightsId?`}>
            <div
              className="FlightsPage-TabPane ui attached segment active tab"
            >
              <FlightsTable />
            </div>
          </Route>
        </>
      )}
    </div>
  );
};

export default withRouter(FlightsPage);
