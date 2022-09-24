import {render, remove, RenderPosition} from '../framework/render.js';
import PointForm from '../view/point-form.js';
import EmptyMessage from '../view/empty-message.js';
import HeaderPresenter from './header-presenter.js';
import PointPresenter from './point-presenter.js';

export default class ListPresenter {
  #eventsModel = null;
  #listContainer = null;
  #newPoint = null;
  #currentOffersArray = [];
  #headerPresenter = null;
  #headerContainer = null;
  #newPointFormComponent = null;
  #openNewPointForm = null;
  #pointPresentersMap = new Map();

  constructor(eventsModel, listContainer) {
    this.#eventsModel = eventsModel;
    this.#listContainer = listContainer;
    this.#newPoint = this.#eventsModel.localPoint;
    this.#currentOffersArray = this.#eventsModel.getOffersList(this.#newPoint.type, this.#newPoint.offers);
    this.#openNewPointForm = () => {
      this.#newPointFormComponent = new PointForm({point: this.#newPoint, offersArray: this.#currentOffersArray});
      this.#newPointFormComponent.setClickHandler(() => {
        this.#newPointFormComponent.deleteClickHandler();
        remove(this.#newPointFormComponent);
      });
      render(this.#newPointFormComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
    };
    this.#headerContainer = document.querySelector('.trip-main');
    this.#headerPresenter = new HeaderPresenter(this.#eventsModel, this.#headerContainer, this.#openNewPointForm);
  }

  init() {
    const resetAllPointsView = () => {
      this.#pointPresentersMap.forEach((presenter) => presenter.resetView());
    };
    this.#headerPresenter.init();
    if (this.#eventsModel.points.length === 0) {
      render(new EmptyMessage, this.#listContainer);
    } else {
      for (const point of this.#eventsModel.points) {
        const offersArray = this.#eventsModel.getOffersList(point.type, point.offers);
        const destination = this.#eventsModel.getDestinationById(point.destination);
        const pointPresenter = new PointPresenter({
          listContainer: this.#listContainer,
          point,
          offersArray,
          destination,
          eventsModel: this.#eventsModel,
          reset: resetAllPointsView,
        });
        this.#pointPresentersMap.set(point.id, pointPresenter);
        pointPresenter.init();
      }
    }
  }
}
