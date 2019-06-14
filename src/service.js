export default class Service {
  constructor() {
    this.apiBase = 'https://api.iev.aero/api/flights/';
  }

  getFlight(date) {
    const data = this._getData(date);
    return this._dataModification(data);
  }

  _dataModification(data) {
    const departure = data.then((body) => {
      return body.departure.reduce((acc, currentV) => {
        acc.push({
          terminal: currentV.term,
          gate: currentV.gateNo,
          time: this._dateFormat(currentV.timeDepShedule),
          destination: currentV['airportToID.name_en'],
          airline: currentV.airline.en.name,
          flight: currentV.codeShareData[0].codeShare,
          status: currentV.status,
        });
        return acc;
      }, []);
    });

    const arrival = data.then((body) => {
      return body.arrival.reduce((acc, currentV) => {
        acc.push({
          terminal: currentV.term,
          time: this._dateFormat(currentV.timeArrShedule),
          destination: currentV['airportFromID.name_en'],
          airline: currentV.airline.en.name,
          flight: currentV.codeShareData[0].codeShare,
          status: currentV.status,
        });
        return acc;
      }, []);
    });
    return Promise.all([departure, arrival]).then((values) => {
      return {
        departure: values[0],
        arrival: values[1],
      };
    });
  }

  _getData(date) {
    return fetch(`${this.apiBase}${date}`)
      .then(res => res.json())
      .then(res => res.body);
  }
  _dateFormat(date) {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  }
}
