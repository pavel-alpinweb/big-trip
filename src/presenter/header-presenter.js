import {render, RenderPosition} from '../framework/render.js';
import TripInfo from '../view/trip-info.js';

export default class HeaderPresenter {
  #eventsModel = null;
  #headerContainer = null;
  constructor(eventsModel, headerContainer) {
    this.#eventsModel = eventsModel;
    this.#headerContainer = headerContainer;
  }

  init() {
    render(new TripInfo({totalPrice: this.#eventsModel.totalPrice, pointsNames: this.#eventsModel.pointsNames, tripDuring: this.#eventsModel.tripDuring}), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
