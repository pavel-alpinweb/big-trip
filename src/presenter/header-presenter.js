import {render, RenderPosition} from '../framework/render.js';
import TripInfo from '../view/trip-info.js';
import NewEventButton from '../view/new-event-button.js';

export default class HeaderPresenter {
  #eventsModel = null;
  #headerContainer = null;
  #openNewPointForm = null;
  #displayPoints = null;
  #clearPoints = null;
  constructor({eventsModel, headerContainer, openNewPointForm, displayPoints, clearPoints}) {
    this.#eventsModel = eventsModel;
    this.#headerContainer = headerContainer;
    this.#openNewPointForm = openNewPointForm;
    this.#displayPoints = displayPoints;
    this.#clearPoints = clearPoints;
  }

  init() {
    const buttonComponent = new NewEventButton();
    buttonComponent.setClickHandler(() => {
      this.#openNewPointForm(buttonComponent);
      this.#clearPoints();
      this.#displayPoints(this.#eventsModel.pointsSortedByDay);
    });
    render(buttonComponent, this.#headerContainer);
    render(new TripInfo({totalPrice: this.#eventsModel.totalPrice, pointsNames: this.#eventsModel.pointsNames, tripDuring: this.#eventsModel.tripDuring}), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}
