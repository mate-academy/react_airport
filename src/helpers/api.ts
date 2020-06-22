const API_KEY = "54f353d74ed1c0a937684e3d73df4511";
const API_URL = "http://api.openweathermap.org/data/2.5/";


export async function fetchCityWeather<T>(cityId: number | string): Promise<T> {
  let response;
  if (typeof cityId === 'number') {
    response = await fetch(`${API_URL}weather?id=${cityId}&appid=${API_KEY}`);
  } else {
    response = await fetch(`${API_URL}weather?q=${cityId}&appid=${API_KEY}`);
  }
  if (response.status !== 200) {
    console.log('failed');
    return Promise.reject(new Error(response.statusText))
  }
  const cityWeather = await response.json();
  
  return cityWeather;
}

export async function fetcWeatherDetails(cityId: number) {
  const response = await fetch(`${API_URL}forecast?id=${cityId}&appid=${API_KEY}`);
  const cityWeather = await response.json();

  return cityWeather;
}


/*api.openweathermap.org/data/2.5/weather?q=London*/

/*http://openweathermap.org/img/wn/10d@2x.png*/

/*api.openweathermap.org/data/2.5/forecast?id=524901*/
