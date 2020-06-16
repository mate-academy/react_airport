// eslint-disable-next-line
/// <reference types="react-scripts" />

interface IFlights {
  arrival: IFlight[];
  departure: IFlight[];
}

interface IFlight {
  [key: string]: T;
  ID: number;
  actual: string;
  airline: IAirline;
  'airportToID.city_en'?: string;
  'airportFromID.city_en'?: string;
  checkinNo?: string;
  codeShareData: Array<ICodeData>;
  gateNo?: string;
  status: typeof Status;
  timeArrShedule?: string;
  timeDepShedule?: string;
  term: string;
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

interface IHeadersConfig {
  terminal: string;
  gate?: string;
  time: string;
  destination: string;
  status: string;
  airline: string;
  flight: string;
  details: string;
}

type Status = 'CX' | 'ON' | 'DL' | 'LN' | 'FR';
/*
  TODO: Status description
  LN: 'Landed'
  ON: 'On time'
  CX: 'Canceled'
  FR: 'In flight'
  DP: 'Departed at'
*/
