/// <reference types="react-scripts" />

interface City {
  id: number,
  name: string,
  state: string,
  country: string,
  timezone: number,
  coord: {
    lon: number,
    lat: number,
  }
}

interface CurrentWeather {
  base: string,
  clouds: {
    all: number,
  },
  cod: number,
  message?: string,
  coord: {
    lat: number
    lon: number
 },

  dt: number,
  dt_txt?: string,
  id: number,
  main: {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
  }
  name: string,
  sys: {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
  },
  timezone: number,
  visibility: number,
  weather:  Array<Weather>,
  wind: {
    deg: number,
    speed: number,
  }
}

interface Weather {
  id: number,
  main: string,
  descriptions: string,
  icon: string,
}

interface CityId {
  cityId: number;
}

interface WeatherDetails {
  city: City;
  cnt: number;
  cod: string;
  list: Array<CurrentWeather>;
}



