import {generateDestination, generatePoint, generateOffersByTypeArray} from '../mock/mock.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import {DATES, POINTS_NAMES} from '../utils/constants';

export default class EventsModel {
  #localPoint = {
    'base_price': '',
    'date_from': '',
    'date_to': '',
    'destination': null,
    'is_favorite': false,
    'offers': [],
    'type': 'taxi'
  };

  #points = Array.from(DATES, ([dateFrom, dateTo]) => generatePoint(dateFrom, dateTo));
  #offersByType = generateOffersByTypeArray();
  #destinations = Array.from(POINTS_NAMES, (index, name) => generateDestination(index, name));

  get localPoint() {
    return this.#localPoint;
  }

  get points() {
    return this.#points;
  }

  get offersByType() {
    return this.#offersByType;
  }

  get pastPoints() {
    const currentDate = dayjs(new Date());
    return this.#points.filter((point) => currentDate.diff(point.date_from, 'd') > 0);
  }

  get futurePoints() {
    const currentDate = dayjs(new Date());
    return this.#points.filter((point) => currentDate.diff(point.date_from, 'd') < 0);
  }

  get pointsSortedByPrice() {
    return this.#points.sort((pointA, pointB) => Number(pointB.base_price) - Number(pointA.base_price));
  }

  get pointsSortedByDay() {
    return this.#points.sort((pointA, pointB) => {
      const dateFromA = dayjs(pointA['date_from']);
      const dateToA = dayjs(pointA['date_to']);
      const diffMillisecondsA = dateToA.diff(dateFromA, 'millisecond');

      const dateFromB = dayjs(pointB['date_from']);
      const dateToB = dayjs(pointB['date_to']);
      const diffMillisecondsB = dateToB.diff(dateFromB, 'millisecond');

      return diffMillisecondsB - diffMillisecondsA;
    });
  }

  get totalPrice() {
    return this.points.reduce((prev, curr) => {
      const totalBasePrice = prev + Number(curr.base_price);
      const offersList = this.getOffersList(curr.type, curr.offers);
      return offersList.reduce((p, c) => p + c.price, totalBasePrice);
    }, 0);
  }

  get pointsNames() {
    const allNames = [];
    for (const point of this.points) {
      allNames.push(this.getDestinationById(point.destination).name);
    }
    if (allNames.length > 3) {
      allNames.splice(1, allNames.length - 2, '...');
    }
    return allNames.join('&nbsp;&mdash;&nbsp;');
  }

  get tripDuring() {
    const startPoint = this.points[0];
    const finishPoint = this.points[this.points.length - 1];

    const startDate = dayjs(startPoint.date_from).format('D');
    const startMonth = dayjs(startPoint.date_from).format('MMM');

    const finishDate = dayjs(finishPoint.date_to).format('D');
    const finishMonth = dayjs(finishPoint.date_to).format('MMM');

    if (startMonth === finishMonth && startDate === finishDate) {
      return `${startMonth} ${startDate}`;
    } else if(startMonth === finishMonth) {
      return `${startMonth} ${startDate} &mdash; ${finishDate}`;
    } else {
      return `${startMonth} ${startDate} &mdash; ${finishMonth} ${finishDate}`;
    }
  }

  getOffersList = (type, idsList) => {
    const resultArray = [];
    const currentType = this.offersByType.find((item) => item.type === type);

    for (const id of idsList) {
      const offer = currentType.offers.find((item) => item.id === id);
      if (offer) {
        resultArray.push(offer);
      }
    }
    return resultArray;
  };

  getDestinationById = (id) => this.#destinations.find((item) => item.id === id);

  updateCurrentPoint(updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);
    this.#points.splice(index, 1, updatedPoint);
  }
}
