import {generateDestination} from './mock/mock.js';

import HeaderPresenter from './presenter/header-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import EventsPresenter from './presenter/events-presenter.js';
import ListPresenter from './presenter/list-presenter.js';


// Containers
const headerContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const listContainer = document.querySelector('.trip-events__list');

// Presenters
const headerPresenter = new HeaderPresenter();
const filtersPresenter = new FiltersPresenter();
const eventsPresenter = new EventsPresenter();
const listPresenter = new ListPresenter();

headerPresenter.init(headerContainer);
filtersPresenter.init(filtersContainer);
eventsPresenter.init(eventsContainer);
listPresenter.init(listContainer);

// eslint-disable-next-line
console.log('generateDestination', generateDestination());
