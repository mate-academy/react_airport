// eslint-disable-next-line
/// <reference types="react-scripts" />
interface IFlightsFromServer {
  arrival: IFlights[];
  departure: IFlights[];
}

interface IFlights {
  [key: string]: T;
  ID: number;
  actual: string;
  airline: IAirline;
  airportToID?: ICity;
  airportFromID?: ICity;
  checkinNo: string;
  codeShareData: Array<ICodeData>;
  gateNo: string;
  fltNo: string;
  status: Status;
  timeArrShedule?: string;
  timeDepShedule?: string;
  term: string;
}

interface ICity {
  city_en: string;
}

interface IAirline {
  en: IAirlineLanguage;
  ru: IAirlineLanguage;
  ua: IAirlineLanguage;
}

interface IAirlineLanguage {
  about: string;
  id: number;
  logoSmallName: string;
  name: string;
}

interface ICodeData {
  airline: IAirline;
  codeShare: string;
}

enum Status {
  'CX',
  'ON',
}
