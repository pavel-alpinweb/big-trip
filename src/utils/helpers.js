import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const formatEventDate = (eventDate) => dayjs(eventDate).format('D MMM');
const formatEventTime = (eventDate) => dayjs(eventDate).format('HH:mm');
const deferenceBetweenDays = (from, to) => {
  const dateFrom = dayjs(from);
  const dateTo = dayjs(to);

  const diffMilliseconds = dateTo.diff(dateFrom, 'millisecond');
  const durationDates = dayjs.duration(diffMilliseconds);

  // eslint-disable-next-line no-console
  console.log('duration', dayjs.duration(diffMilliseconds));

  if (durationDates.$d.days > 0) {
    return `${durationDates.$d.days}D ${durationDates.$d.hours}H ${durationDates.$d.minutes}M`;
  } else if (durationDates.$d.hours > 0) {
    return `${durationDates.$d.hours}H ${durationDates.$d.minutes}M`;
  } else {
    return `${durationDates.$d.minutes}M`;
  }
};

export {formatEventDate, formatEventTime, deferenceBetweenDays};
