import {generateDestination, generatePoint, generateOffersByTypeArray} from '../mock/mock.js';

export default class EventsModel {
  destination = generateDestination();
  localPoint = {
    'base_price': 222,
    'date_from': '',
    'date_to': '',
    'destination': '',
    'is_favorite': false,
    'offers': [],
    'type': 'taxi'
  };

  point = generatePoint(this.destination);
  points = Array.from({length: 5}, () => generatePoint(generateDestination()));
  offersByType = generateOffersByTypeArray();

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
