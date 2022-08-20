import {generateDestination, generateOffersByType, generatePoint} from '../mock/mock.js';
import {TYPES} from '../utils/constants';

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
  offersByType = Object.values(TYPES).map((type) => generateOffersByType(type));
}
