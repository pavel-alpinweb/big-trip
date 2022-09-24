import EventsModel from './model/events-model.js';

import SortPresenter from './presenter/sort-presenter.js';
import ListPresenter from './presenter/list-presenter.js';

// Models
const eventsModel = new EventsModel();

// Containers
const eventsContainer = document.querySelector('.trip-events');
const listContainer = document.querySelector('.trip-events__list');

// Presenters
const sortPresenter = new SortPresenter(eventsModel, eventsContainer);
const listPresenter = new ListPresenter(eventsModel, listContainer);

// filtersPresenter.init();
sortPresenter.init();
listPresenter.init();

// eslint-disable-next-line
console.log('EventsModel', eventsModel);
