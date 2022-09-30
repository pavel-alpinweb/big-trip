import Observable from '../framework/observable.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {UI_UPDATE_TYPES} from '../utils/constants.js';
dayjs.extend(duration);

export default class EventsModel extends Observable {
  #localPoint = {
    'base_price': '',
    'date_from': new Date(),
    'date_to': new Date(),
    'destination': null,
    'is_favorite': false,
    'offers': [],
    'type': 'taxi',
    'id': '0',
  };

  #points = [];
  #offers = [];
  #destinations = [];

  get localPoint() {
    return this.#localPoint;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
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
    const points = [...this.#points];
    return points.sort((pointA, pointB) => Number(pointB.base_price) - Number(pointA.base_price));
  }

  get pointsSortedByTime() {
    const points = [...this.#points];
    return points.sort((pointA, pointB) => {
      const dateFromA = dayjs(pointA['date_from']);
      const dateToA = dayjs(pointA['date_to']);
      const diffMillisecondsA = dateToA.diff(dateFromA, 'millisecond');

      const dateFromB = dayjs(pointB['date_from']);
      const dateToB = dayjs(pointB['date_to']);
      const diffMillisecondsB = dateToB.diff(dateFromB, 'millisecond');

      return diffMillisecondsB - diffMillisecondsA;
    });
  }

  get pointsSortedByDay() {
    const points = [...this.#points];
    return points.sort((pointA, pointB) => {
      const dateFromA = dayjs(pointA['date_from']).valueOf();
      const dateFromB = dayjs(pointB['date_from']).valueOf();

      return dateFromA - dateFromB;
    });
  }

  get totalPrice() {
    return this.points.reduce((prev, curr) => {
      const totalBasePrice = prev + Number(curr.base_price);
      const offersList = this.getOffersListByIds(curr.type, curr.offers);
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

  getOffersListByIds = (type, idsList) => {
    const resultArray = [];
    const currentType = this.offers.find((item) => item.type === type);

    for (const id of idsList) {
      const offer = currentType.offers.find((item) => item.id === id);
      if (offer) {
        resultArray.push(offer);
      }
    }
    return resultArray;
  };

  getOffersListByType = (type) => this.offers.find((item) => item.type === type).offers;

  getDestinationById = (id) => this.#destinations.find((item) => item.id === id);

  getDestinationByName = (name) => this.#destinations.find((item) => item.name === name);

  updateCurrentPoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);
    this.#points.splice(index, 1, updatedPoint);
    this._notify(updateType, updatedPoint);
  }

  deleteCurrentPoint(id) {
    this.#points = this.#points.filter((item) => item.id !== id);
    this._notify(UI_UPDATE_TYPES.all);
  }

  pushNewPoint(point) {
    this.#points.push(point);
    this._notify(UI_UPDATE_TYPES.all);
  }

  setAllPoints(points) {
    this.#points = points;
  }

  setAllDestinations(destinations) {
    this.#destinations = destinations;
  }

  setAllOffers(offers) {
    this.#offers = offers;
  }
}
