import { weekDays, monthes } from '../../helpers/constants';


export const  useCurrentTime = (data: number, tz: number, sunriseData?: number, sunsetData?: number) => {

  const getUTCDate = (date: Date) => {
    const utc = new Date(date.getTime() + (date.getTimezoneOffset() * 60000 + tz*1000));
    return utc;
  }

  const formattedMinuts = (date: Date) => {
    const formattedDate =  date.getMinutes()
    .toString().length === 1
    ? '0'+ date.getMinutes()
    : ''+ date.getMinutes();
    return formattedDate;
  }

  const formattedHours = (date: Date) => {
    const formattedDate = date.getHours()
    .toString().length === 1
    ? '0'+ date.getHours()
    : ''+ date.getHours();
    return formattedDate;
  }

  const date = getUTCDate(new Date(data*1000));
  const sunriseDate: Date  = sunriseData
    ? getUTCDate(new Date(sunriseData*1000))
    : getUTCDate(new Date());
  const sunsetDate  = sunsetData
    ? getUTCDate(new Date(sunsetData*1000))
    : getUTCDate(new Date());
  const sunrise = `${formattedHours(sunriseDate)} : ${formattedMinuts(sunriseDate)}`;
  const sunset = `${formattedHours(sunsetDate)} : ${formattedMinuts(sunsetDate)}`;

  const hours = formattedHours(date);
  const minuts = formattedMinuts(date)
  const month = monthes[date.getMonth()];
  const monthDay = date.getDate();
  const weekDay = weekDays[date.getDay()];

  return {
    hours,
    minuts,
    month,
    monthDay,
    weekDay,
    sunrise,
    sunset
  }
}
