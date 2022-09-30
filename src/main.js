import EventsModel from './model/events-model.js';

// import SortPresenter from './presenter/sort-presenter.js';
import ListPresenter from './presenter/list-presenter.js';

// Models
const eventsModel = new EventsModel();

// Containers
const listContainer = document.querySelector('.trip-events__list');

// Presenters
const listPresenter = new ListPresenter(eventsModel, listContainer);

listPresenter.init();

// eslint-disable-next-line
console.log('EventsModel', eventsModel);
