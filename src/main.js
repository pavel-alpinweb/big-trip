import EventsModel from './model/events-model.js';

import HeaderPresenter from './presenter/header-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import ListPresenter from './presenter/list-presenter.js';

// Models
const eventsModel = new EventsModel();

// Containers
const headerContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const listContainer = document.querySelector('.trip-events__list');

// Presenters
const headerPresenter = new HeaderPresenter();
const filtersPresenter = new FiltersPresenter();
const sortPresenter = new SortPresenter(eventsModel, eventsContainer);
const listPresenter = new ListPresenter(eventsModel, listContainer);

headerPresenter.init(headerContainer);
filtersPresenter.init(filtersContainer);
sortPresenter.init();
listPresenter.init();

// eslint-disable-next-line
console.log('EventsModel', eventsModel);
