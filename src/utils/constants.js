export const TYPES = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

export const POINTS_NAMES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Bishkek',
  'Krasnodar',
];

export const DATES = [
  ['2022-12-24T20:00:00', '2022-12-24T15:00:00'],
  ['2022-03-02T10:00:00', '2022-03-02T16:00:00'],
  ['2022-02-24T20:00:00', '2022-03-01T15:00:00'],
];

export const POINT_MODES = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const SORT_MODES = {
  DAY: 'pointsSortedByDay',
  TIME: 'pointsSortedByTime',
  PRICE: 'pointsSortedByPrice',
};

export const FILTERS_MODES = {
  ALL: 'points',
  FUTURE: 'futurePoints',
  PAST: 'pastPoints',
};

export const UI_UPDATE_TYPES = {
  ALL: 'ALL',
  POINT: 'POINT',
};

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const AUTHORIZATION = 'Basic big-trip-sioda';
export const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';
