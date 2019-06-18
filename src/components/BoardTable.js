import React, { Component } from 'react';
import Head from './Head';
import TableBody from './TableBody';
import '../css/BoardTable.css';

class BoardTable extends Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    return (
      <section className="table">
        <table>
          <Head status = {this.props.status}/>
          <TableBody status = {this.props.status} day = {this.props.day} loaded = {this.props.loaded}/>
        </table>
      </section>
    );
  }
}

export default BoardTable;
