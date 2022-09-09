import {TYPES, POINTS_NAMES} from '../utils/constants.js';
import {getRandomInteger} from '../utils/helpers.js';

export const generateDestination = (i) => {
  const name = POINTS_NAMES[getRandomInteger(0, POINTS_NAMES.length - 1)];
  return {
    'id': i,
    'description': `${name}, is a beautiful city, a true asian pearl, with crowded streets.`,
    'name': `${name}`,
    'pictures': [
      {
        'src': `http://picsum.photos/300/200?r=${getRandomInteger(0, i)}`,
        'description': `${name} parliament building`
      }
    ]
  };
};

export const generateOffer = (el, i) => ({
  'id': i,
  'title': 'Upgrade to a business class',
  'price': getRandomInteger(i, 100),
});

export const generateOffersByType = (type) => ({
  type,
  'offers': Array.from({length: 3}, generateOffer),
});

export const generateOffersByTypeArray = () => (Object.values(TYPES).map((type) => generateOffersByType(type)));

export const generatePoint = (destination = null, dateFrom, dateTo) => ({
  'base_price': getRandomInteger(100, 2000),
  'date_from': dateFrom,
  'date_to': dateTo,
  destination,
  'id': '0',
  'is_favorite': false,
  'offers': [0, 2],
  'type': Object.values(TYPES)[getRandomInteger(0, Object.values(TYPES).length - 1)],
});
