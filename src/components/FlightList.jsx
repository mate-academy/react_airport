import React, { Component, Fragment } from 'react';
import Flight from './Flight';

export default class FlightList extends Component {
  constructor(props) {
    super(props);
    this.departure = this.props.data
  }

  render() {
    return (
      <Fragment>
        {this.departure.map(item => <Flight key={item.ID} data={item} />)}
      </Fragment>
    );
  }
}
