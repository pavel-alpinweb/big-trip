import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const formatEventDate = (eventDate) => dayjs(eventDate).format('D MMM');
const formatEventTime = (eventDate) => dayjs(eventDate).format('HH:mm');
const formatEventDateTime = (eventData) => {
  const formatDate = dayjs(eventData).format('DD/MM/YY HH:mm');
  if (formatDate !== 'Invalid Date' && eventData.length > 0) {
    return formatDate;
  } else {
    return dayjs(new Date).format('DD/MM/YY HH:mm');
  }
};
const deferenceBetweenDays = (from, to) => {
  const dateFrom = dayjs(from);
  const dateTo = dayjs(to);

  const diffMilliseconds = dateTo.diff(dateFrom, 'millisecond');
  const durationDates = dayjs.duration(diffMilliseconds);

  if (durationDates.$d.days > 0) {
    return `${durationDates.$d.days}D ${durationDates.$d.hours}H ${durationDates.$d.minutes}M`;
  } else if (durationDates.$d.hours > 0) {
    return `${durationDates.$d.hours}H ${durationDates.$d.minutes}M`;
  } else {
    return `${durationDates.$d.minutes}M`;
  }
};
const typeName = (type) => type[0].toUpperCase() + type.substring(1);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export {formatEventDate, formatEventTime, deferenceBetweenDays, typeName, formatEventDateTime, getRandomInteger, getKeyByValue};
