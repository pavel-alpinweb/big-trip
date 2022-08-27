import {render, RenderPosition} from '../render.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class ListPresenter {
  #eventsModel = null;
  #listContainer = null;
  #newPoint = null;
  #currentOffersArray = [];
  constructor(eventsModel, listContainer) {
    this.#eventsModel = eventsModel;
    this.#listContainer = listContainer;
    this.#newPoint = this.#eventsModel.localPoint;
    this.#currentOffersArray = this.#eventsModel.getOffersList(this.#newPoint.type, this.#newPoint.offers);
  }

  editNewPoint() {
    render(new PointForm({point: this.#newPoint, offersArray: this.#currentOffersArray}), this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  init() {
    for (const point of this.#eventsModel.points) {
      const offersArray = this.#eventsModel.getOffersList(point.type, point.offers);
      render(new Point({point, offersArray}), this.#listContainer);
    }
  }
}
