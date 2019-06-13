import React from 'react';
import BoardHeader from './components/BoardHeader';
import BoardTable from './components/BoardTable';
import Calendar from './components/Calendar';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      status: 'departure',
      calendarStatus: 'Today',
      loaded: true
    }

    this.changeStatus = this.changeStatus.bind(this);
    this.changeCalendarStatus = this.changeCalendarStatus.bind(this);
  }

  changeStatus(event) {
    this.setState((state) => {
      return {
        status: state.status === 'arrival' ? 'departure' : 'arrival'
      }
    });
  }

  changeCalendarStatus(status) {
    this.setState({
      calendarStatus: status,
      loaded: false
    });
  }

  render() {
    return (
      <section className="main_wrapper">
        <BoardHeader changeStatus = {this.changeStatus}/>
        <Calendar dayActive = {this.state.calendarStatus} changeCalendarStatus = {this.changeCalendarStatus}/>
        <BoardTable  status = {this.state.status} day={this.state.calendarStatus} loaded={this.state.loaded}/>
      </section>
    );
  }
}

export default App;
