import {render, RenderPosition} from '../framework/render.js';
import TripInfo from '../view/trip-info.js';
import NewEventButton from '../view/new-event-button.js';

export default class HeaderPresenter {
  #eventsModel = null;
  #headerContainer = null;
  #openNewPointForm = null;
  constructor(eventsModel, headerContainer, openNewPointForm) {
    this.#eventsModel = eventsModel;
    this.#headerContainer = headerContainer;
    this.#openNewPointForm = openNewPointForm;
  }

  init() {
    render(new NewEventButton(), this.#headerContainer);
    render(new TripInfo({totalPrice: this.#eventsModel.totalPrice, pointsNames: this.#eventsModel.pointsNames, tripDuring: this.#eventsModel.tripDuring}), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
