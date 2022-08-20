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
  offersByType = generateOffersByTypeArray();
}
