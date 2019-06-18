export default class Service {
  constructor() {
    this.apiBase = 'https://api.iev.aero/api/flights/';
  }

  getFlight(date) {
    const data = this._getData(date);
    return this._modifyData(data);
  }

  _modifyData(data) {
    return data.then((body) => {
      const departure = body.departure.map((currentV) => {
        return ({
          terminal: currentV.term,
          gate: currentV.gateNo,
          time: this._formatDate(currentV.timeDepShedule),
          destination: currentV['airportToID.name_en'],
          airline: currentV.airline.en.name,
          flight: currentV.codeShareData[0].codeShare,
          status: currentV.status,
        });
      });
      const arrival = body.arrival.map((currentV) => {
        return ({
          terminal: currentV.term,
          time: this._formatDate(currentV.timeArrShedule),
          destination: currentV['airportFromID.name_en'],
          airline: currentV.airline.en.name,
          flight: currentV.codeShareData[0].codeShare,
          status: currentV.status,
        });
      });
      return {
        departure,
        arrival,
      };
    });
  }

  _getData(date) {
    return fetch(`${this.apiBase}${date}`)
      .then(res => res.json())
      .then(res => res.body);
  }
  _formatDate(date) {
    const time = new Date(date);
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  }
}
