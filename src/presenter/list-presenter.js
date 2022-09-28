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
    this.#headerContainer = document.querySelector('.trip-main');
    this.#filtersContainer = document.querySelector('.trip-controls__filters');
    this.#sortContainer = document.querySelector('.trip-events__list');
  }

  resetAllPointsView = () => {
    this.#pointPresentersMap.forEach((presenter) => presenter.resetView());
  };

  openNewPointForm = () => {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#newPointFormComponent.deleteClickHandler();
        this.#newPointFormComponent.resetState();
        remove(this.#newPointFormComponent);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    this.#newPointFormComponent = new PointForm({
      props: {
        point: this.#newPoint,
        offersArray: [],
        isNewPoint: true,
        destinationsList: this.#eventsModel.destinations,
      },
      getOffersList: this.#eventsModel.getOffersListByIds,
      getDestinationByName: this.#eventsModel.getDestinationByName,
      getOffersListByType: this.#eventsModel.getOffersListByType,
    });
    this.#newPointFormComponent.setCloseClickHandler(() => {
      this.#newPointFormComponent.resetState();
      this.#newPointFormComponent.deleteClickHandler();
      remove(this.#newPointFormComponent);
    });
    render(this.#newPointFormComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', onEscKeyDown);
  };

  displayPoints = (pointsList) => {
    for (const point of pointsList) {
      const offersArray = this.#eventsModel.getOffersListByIds(point.type, point.offers);
      const allOffers = this.#eventsModel.getOffersListByType(point.type);
      const destination = this.#eventsModel.getDestinationById(point.destination);
      const pointPresenter = new PointPresenter({
        listContainer: this.#listContainer,
        point,
        offersArray,
        allOffers,
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
