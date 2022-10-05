import EventsModel from './model/events-model.js';
import PointsApiService from './services/points-api-service.js';
import OffersApiService from './services/offers-api-service.js';
import DestinationsApiService from './services/destinations-api-service.js';
import {AUTHORIZATION, END_POINT} from './utils/constants.js';

const pointsService = new PointsApiService(END_POINT, AUTHORIZATION);
const offersService = new OffersApiService(END_POINT, AUTHORIZATION);
const destinationsService = new DestinationsApiService(END_POINT, AUTHORIZATION);

// import SortPresenter from './presenter/sort-presenter.js';
import ListPresenter from './presenter/list-presenter.js';

// Models
const eventsModel = new EventsModel();

// Containers
const listContainer = document.querySelector('.trip-events__list');

// Presenters
const listPresenter = new ListPresenter({
  eventsModel,
  listContainer,
  pointsService,
  offersService,
  destinationsService,
});

listPresenter.init();

// eslint-disable-next-line
console.log('ListPresenter', listPresenter);
