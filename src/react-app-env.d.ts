// eslint-disable-next-line
/// <reference types="react-scripts" />
interface IFlights {
  [key: string]: T;
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
  timeDepShedule: string;
  timeToStand: string;
  timeTakeofFact?: string;
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

interface IHeadersDetailsConfig {
  date: string;
  time: string;
  terminal: string;
  flight: string;
  stand?: string;
  gate?: string;
}

type DateMap = {
  yesterday: number;
  today: number;
  tomorrow: number;
};

type Status = 'ON' | 'CX' | 'LN' | 'CK' | 'FR' | 'BD' | 'DP' | 'DV' | 'GC';
/*
  TODO: Status description
  ON: 'On time'
  CX: 'Canceled'
  LN: 'Landed'
  CK: 'Check-in'
  FR: 'In flight'
  BD: 'Boarding'
  DP: 'Departed at'
  DV: 'Route change'
  GC: 'Gate closed'
*/
