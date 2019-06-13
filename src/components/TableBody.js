import React, { Component } from 'react';
import TableRow from './TableRow';

class TableBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrival: null,
      departure: null,
      loaded: false,
    }

    this.loader = React.createRef();
  }

  createRequest(day) {
    let nowDate;
    const month = new Date().getMonth()+1 < 10 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1;
   
    if (day === 'Today') {
      nowDate = `${new Date().getDate()}-${month}-${new Date().getFullYear()}`
    }

    if (day === 'Yestarday') {
      nowDate = `${new Date().getDate() - 1}-${month}-${new Date().getFullYear()}`
    }

    if (day === 'Tomorrow') {
      nowDate = `${new Date().getDate() + 1}-${month}-${new Date().getFullYear()}`
    }

    fetch(`https://api.iev.aero/api/flights/${nowDate}`).then(response => response.json()).then(response => response).then((response) => {
      const departure = response.body.departure.map((item) => {
        return this.createLists(item, 'timeDepShedule', 'airportToID.city_en', 'dep');
      });
      const arrival = response.body.arrival.map((item) => {
        return this.createLists(item, 'timeArrShedule', 'airportFromID.city_en', 'arr');
      });

      this.setState({
        arrival: arrival,
        departure: departure,
        loaded: true
      })
    });
  }

  createLists(item, timeShedule, airport, classForGates) {
    const itemTime = new Date(item[timeShedule]);
    const localTime = `${itemTime.getHours()}:${itemTime.getMinutes().toString().length === 2 ? itemTime.getMinutes() : '0' +  itemTime.getMinutes()}`;
    const itemDeptTime = new Date(item['timeDepFact']);
    const deptTime = `${itemDeptTime.getHours()}:${itemDeptTime.getMinutes().toString().length === 2 ? itemDeptTime.getMinutes() : '0' +  itemDeptTime.getMinutes()}`;
    let status;
    
    switch (item.status) {
      case 'DP': 
        status = 'Departed at ' + deptTime;
        break;
      case 'ON': 
        status = 'On time';
        break;
      case 'CX': 
        status = 'Canceled';
        break;
      case 'CK': 
        status = 'Check-in';
        break;
    default:
        status = item.status;
    }
   
    return (
      <TableRow
        key={item.ID}
        terminal={item.term}
        localTime={localTime}
        destination={item[airport].trim()}
        status={status}
        airline={item.airline.en.name}
        logo={item.airline.en.logoSmallName}
        flight={item.codeShareData[0].codeShare}
        gateNo={item.gateNo}
        gateClass = {classForGates}
      />
    )
  }

  componentDidMount() {
    this.placeLoader(this.loader.current);
    this.createRequest('Today');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.day !== prevProps.day) {
      console.log(this.state.top);
      this.setState({
        loaded: false
    })
      if (this.props.day === 'Yestarday') {
        this.createRequest('Yestarday');
        
      }

      if (this.props.day === 'Today') {
        this.createRequest('Today');
      }

      if (this.props.day === 'Tomorrow') {
        this.createRequest('Tomorrow');
      }
    }
  }

  placeLoader(elem) {
    const loader = elem;
    const top = document.documentElement.clientHeight/2 - loader.clientHeight/2;
    const left = document.documentElement.clientWidth/2 - loader.clientWidth/2;
    this.setState({
      style: {
        top: top + 'px',
        left: left + 'px'
      }
    })
  }

  render() {
    if (this.state.loaded) {
      return (
        <tbody>
          {this.state[this.props.status]}
        </tbody>
      );
    } else {
      return (
        <div>
          <div className="preloader"></div>
          <div ref={this.loader} style={this.state.style} className="loading"></div>
        </div>
      )
    }
  }
}

export default TableBody;
