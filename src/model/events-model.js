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
  #points = Array.from({length: 0}, () => generatePoint(generateDestination()));
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
