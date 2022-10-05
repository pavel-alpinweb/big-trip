import {remove, render, RenderPosition} from '../framework/render.js';
import TripInfo from '../view/trip-info.js';
import NewEventButton from '../view/new-event-button.js';

export default class HeaderPresenter {
  #eventsModel = null;
  #headerContainer = null;
  #openNewPointForm = null;
  #displayPoints = null;
  #clearPoints = null;
  #buttonComponent = null;
  #tripInfoComponent = null;
  constructor({eventsModel, headerContainer, openNewPointForm, displayPoints, clearPoints}) {
    this.#eventsModel = eventsModel;
    this.#headerContainer = headerContainer;
    this.#openNewPointForm = openNewPointForm;
    this.#displayPoints = displayPoints;
    this.#clearPoints = clearPoints;
  }

  init() {
    this.#buttonComponent = new NewEventButton();
    render(this.#buttonComponent, this.#headerContainer);
    if (this.#eventsModel.totalPrice && this.#eventsModel.pointsNames && this.#eventsModel.tripDuring) {
      this.#tripInfoComponent = new TripInfo({
        totalPrice: this.#eventsModel.totalPrice,
        pointsNames: this.#eventsModel.pointsNames,
        tripDuring: this.#eventsModel.tripDuring});
      this.#buttonComponent.setClickHandler(() => {
        this.#openNewPointForm(this.#buttonComponent);
        this.#clearPoints();
        this.#displayPoints(this.#eventsModel.pointsSortedByDay);
      });
      render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
    } else {
      this.#buttonComponent.changeBtnState();
    }
  }

  destroy() {
    remove(this.#buttonComponent);
    remove(this.#tripInfoComponent);
  }
}
