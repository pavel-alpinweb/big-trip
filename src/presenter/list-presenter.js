import {render, remove, RenderPosition} from '../framework/render.js';
import PointForm from '../view/point-form.js';
import EmptyMessage from '../view/empty-message.js';
import HeaderPresenter from './header-presenter.js';
import PointPresenter from './point-presenter.js';
import FiltersPresenter from './filters-presenter.js';
import SortPresenter from './sort-presenter';

export default class ListPresenter {
  #eventsModel = null;
  #listContainer = null;
  #newPoint = null;
  #currentOffersArray = [];
  #filtersPresenter = null;
  #filtersContainer = null;
  #sortPresenter = null;
  #sortContainer = null;
  #headerPresenter = null;
  #headerContainer = null;
  #newPointFormComponent = null;
  #pointPresentersMap = new Map();

  constructor(eventsModel, listContainer) {
    this.#eventsModel = eventsModel;
    this.#listContainer = listContainer;
    this.#newPoint = this.#eventsModel.localPoint;
    this.#currentOffersArray = this.#eventsModel.getOffersList(this.#newPoint.type, this.#newPoint.offers);
    this.#headerContainer = document.querySelector('.trip-main');
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
    this.#sortContainer = document.querySelector('.trip-events__list');
  }

  resetAllPointsView = () => {
    this.#pointPresentersMap.forEach((presenter) => presenter.resetView());
  };

  openNewPointForm = () => {
    this.#newPointFormComponent = new PointForm({
      props: {
        point: this.#newPoint,
        offersArray: this.#currentOffersArray,
        destinationsList: this.#eventsModel.destinations,
      },
      getOffersList: this.#eventsModel.getOffersList,
      getDestinationByName: this.#eventsModel.getDestinationByName,
    });
    this.#newPointFormComponent.setClickHandler(() => {
      this.#newPointFormComponent.deleteClickHandler();
      remove(this.#newPointFormComponent);
    });
    render(this.#newPointFormComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  };

  displayPoints = (pointsList) => {
    for (const point of pointsList) {
      const offersArray = this.#eventsModel.getOffersList(point.type, point.offers);
      const destination = this.#eventsModel.getDestinationById(point.destination);
      const pointPresenter = new PointPresenter({
        listContainer: this.#listContainer,
        point,
        offersArray,
        destination,
        eventsModel: this.#eventsModel,
        reset: this.resetAllPointsView,
        destinationsList: this.#eventsModel.destinations,
      });
      this.#pointPresentersMap.set(point.id, pointPresenter);
      pointPresenter.init();
    }
  };

  clearPoints = () => {
    this.#pointPresentersMap.forEach((pointPresenter) => pointPresenter.destroy());
    this.#pointPresentersMap.clear();
  };

  init() {
    this.#headerPresenter = new HeaderPresenter(this.#eventsModel, this.#headerContainer, this.openNewPointForm);
    this.#headerPresenter.init();
    this.#filtersPresenter = new FiltersPresenter({
      eventsModel: this.#eventsModel,
      filtersContainer: this.#filtersContainer,
      clearPoints: this.clearPoints,
      displayPoints: this.displayPoints,
    });
    this.#filtersPresenter.init();
    this.#sortPresenter = new SortPresenter({
      eventsModel: this.#eventsModel,
      sortContainer: this.#sortContainer,
      clearPoints: this.clearPoints,
      displayPoints: this.displayPoints,
    });
    this.#sortPresenter.init();
    if (this.#eventsModel.points.length === 0) {
      render(new EmptyMessage, this.#listContainer);
    } else {
      this.displayPoints(this.#eventsModel.pointsSortedByDay);
    }
  }
}
