import {generateDestination, generatePoint, generateOffersByTypeArray} from '../mock/mock.js';

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
