import {render, RenderPosition} from '../framework/render.js';
import TripInfo from '../view/trip-info.js';
import NewEventButton from '../view/newEventButton.js';
import PointForm from '../view/point-form.js';

export default class HeaderPresenter {
  #eventsModel = null;
  #headerContainer = null;
  #newPoint = null;
  #listContainer = null;
  #currentOffersArray = [];
  constructor(eventsModel, headerContainer, listContainer) {
    this.#eventsModel = eventsModel;
    this.#headerContainer = headerContainer;
    this.#listContainer = listContainer;
    this.#newPoint = this.#eventsModel.localPoint;
    this.#currentOffersArray = this.#eventsModel.getOffersList(this.#newPoint.type, this.#newPoint.offers);
  }

  init() {
    const pontFormComponent = new PointForm({point: this.#newPoint, offersArray: this.#currentOffersArray});
    const editNewPoint = () => {
      render(pontFormComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
    };
    pontFormComponent.setClickHandler(() => {
      pontFormComponent.shake();
    });
    pontFormComponent.setSubmitHandler(() => {
      pontFormComponent.shake();
    });


    render(new TripInfo({totalPrice: this.#eventsModel.totalPrice, pointsNames: this.#eventsModel.pointsNames, tripDuring: this.#eventsModel.tripDuring}), this.#headerContainer, RenderPosition.AFTERBEGIN);
    const newPointBtn = new NewEventButton;
    newPointBtn.setClickHandler(editNewPoint);
    render(newPointBtn, this.#headerContainer);
  }
}
