import {render, remove, RenderPosition} from '../framework/render.js';
import PointForm from '../view/point-form.js';
import EmptyMessage from '../view/empty-message.js';
import HeaderPresenter from './header-presenter.js';
import PointPresenter from './point-presenter.js';
import FiltersPresenter from './filters-presenter.js';
import SortPresenter from './sort-presenter';
import {getAllPoints, getAllDestinations, getAllOffers, createPoint} from '../mock/mock';
import {UI_UPDATE_TYPES} from '../utils/constants';

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
    this.#eventsModel.addObserver(this.#updateUI);
  }

  resetAllPointsView = () => {
    this.#pointPresentersMap.forEach((presenter) => presenter.resetView());
  };

  closeNewPointForm(buttonComponent, onEscKeyDown) {
    buttonComponent.changeBtnState();
    this.#newPointFormComponent.resetState();
    this.#newPointFormComponent.deleteClickHandler();
    document.removeEventListener('keydown', onEscKeyDown);
    remove(this.#newPointFormComponent);
  }

  openNewPointForm = (buttonComponent) => {
    buttonComponent.changeBtnState();
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        buttonComponent.changeBtnState();
        this.#newPointFormComponent.resetState();
        this.#newPointFormComponent.deleteClickHandler();
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
      this.closeNewPointForm(buttonComponent, onEscKeyDown);
    });
    this.#newPointFormComponent.setSubmitHandler(async (isNewPoint, point) => {
      if (isNewPoint) {
        const result = await createPoint(point);
        this.#eventsModel.pushNewPoint(result);
        this.closeNewPointForm(buttonComponent, onEscKeyDown);
      }
    });
    render(this.#newPointFormComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
    this.clearPoints();
    this.displayPoints(this.#eventsModel.pointsSortedByDay);
    this.#filtersPresenter.destroy();
    this.#sortPresenter.destroy();
    this.#initSort();
    this.#initFilters();
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

  #initFilters() {
    this.#filtersPresenter = new FiltersPresenter({
      eventsModel: this.#eventsModel,
      filtersContainer: this.#filtersContainer,
      clearPoints: this.clearPoints,
      displayPoints: this.displayPoints,
    });
    this.#filtersPresenter.init();
  }

  #initSort() {
    this.#sortPresenter = new SortPresenter({
      eventsModel: this.#eventsModel,
      sortContainer: this.#sortContainer,
      clearPoints: this.clearPoints,
      displayPoints: this.displayPoints,
    });
    this.#sortPresenter.init();
  }

  #updateUI = (type) => {
    if (type === UI_UPDATE_TYPES.ALL) {
      this.#filtersPresenter.destroy();
      this.#sortPresenter.destroy();
      this.#initFilters();
      this.#initSort();
      this.clearPoints();
      this.displayPoints(this.#eventsModel.pointsSortedByDay);
    }
  };

  async init() {
    const destinations = await getAllDestinations();
    const points = await getAllPoints();
    const offers = await getAllOffers();
    this.#eventsModel.setAllDestinations(destinations);
    this.#eventsModel.setAllPoints(points);
    this.#eventsModel.setAllOffers(offers);
    this.#headerPresenter = new HeaderPresenter({
      eventsModel: this.#eventsModel,
      headerContainer: this.#headerContainer,
      openNewPointForm: this.openNewPointForm,
      displayPoints: this.displayPoints,
      clearPoints: this.clearPoints,
    });
    this.#headerPresenter.init();
    this.#initFilters();
    this.#initSort();
    if (this.#eventsModel.points.length === 0) {
      render(new EmptyMessage, this.#listContainer);
    } else {
      this.displayPoints(this.#eventsModel.pointsSortedByDay);
    }
  }
}
