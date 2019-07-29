import { dayNumber } from './api/getData';

export const TYPE_DEPARTURE = 'departure';
export const TYPE_ARRIVALS = 'arrival';
export const YESTERDAY = 'Yesterday';
export const TODAY = 'Today';
export const TOMORROW = 'Tomorrow';
export const YESTERDAY_NUM = dayNumber - 1;
export const TODAY_NUM = dayNumber;
export const TOMORROW_NUM = dayNumber + 1;

const month = new Date().getMonth() + 1;

export const TODAY_DATE = `${dayNumber}/0${month}`;
export const YESTERDAY_DATE = `${dayNumber - 1}/0${month}`;
export const TOMORROW_DATE = `${dayNumber + 1}/0${month}`;
