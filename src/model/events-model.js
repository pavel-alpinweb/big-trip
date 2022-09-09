import {generateDestination, generatePoint, generateOffersByTypeArray} from '../mock/mock.js';
import dayjs from 'dayjs';

export default class EventsModel {
  #destination = generateDestination();
  #localPoint = {
    'base_price': '',
    'date_from': '',
    'date_to': '',
    'destination': null,
    'is_favorite': false,
    'offers': [],
    'type': 'taxi'
  };

  #point = generatePoint(this.destination);
  #points = Array.from({length: 5}, () => generatePoint(generateDestination()));
  #offersByType = generateOffersByTypeArray();

  get destination() {
    return this.#destination;
  }

  get localPoint() {
    return this.#localPoint;
  }

  get point() {
    return this.#point;
  }

  get points() {
    return this.#points;
  }

  get offersByType() {
    return this.#offersByType;
  }

  get totalPrice() {
    return this.points.reduce((prev, curr) => prev + Number(curr.base_price), 0);
  }

  get pointsNames() {
    const allNames = [];
    for (const point of this.points) {
      allNames.push(point.destination.name);
    }
    return Array.from(new Set(allNames)).join('&nbsp;&mdash;&nbsp;');
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
      return `${startMonth} ${startDate} &mdash; ${startMonth} ${finishDate}`;
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
}
