import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {typeName, formatEventDateTime} from '../utils/helpers.js';

const createOffersListTemplate = (offers) => {
  if (offers.length <= 0) {return '';}
  else {return `
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offers.map(({title, price}) => `
        <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-1">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
        </div>`).join('')}
    </div>
  `;}
};

const createDestinationTemplate = (destination) => {
  if (!destination) {return '';}
  else {return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`).join('')}

      </div>
    </div>
  </section>
  `;}
};

const createDestinationOptionsTemplate = (destinationsList) => {
  if (destinationsList.length <= 0) {return '';}
  else {
    return `
      <datalist id="destination-list-1">
        ${destinationsList.map(({name}) => `
          <option value="${name}"></option>
        `).join('')}
      </datalist>
    `;
  }
};

const createPointFormTemplate = (props) => `
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${props.point.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${typeName(props.point.type)}
        </label>
        <input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${props.destination?.name ?? ''}"
            list="destination-list-1"
        >
        ${createDestinationOptionsTemplate(props.destinationsList)}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatEventDateTime(props.point.date_from)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatEventDateTime(props.point.date_to)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${props.point.base_price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">

        ${createOffersListTemplate(props.offersArray)}
      </section>

      ${createDestinationTemplate(props.destination)}
    </section>
  </form>
</li>
`;

export default class PointForm extends AbstractStatefulView{
  #getOffersList = null;
  #getDestinationByName = null;

  constructor({props, getOffersList, getDestinationByName}) {
    super();
    this.props = props;
    this._state = {...this.props};
    this.#setInnerHandlers();
    this.#getOffersList = getOffersList;
    this.#getDestinationByName = getDestinationByName;
  }

  get template() {
    return createPointFormTemplate(this._state);
  }

  #setInnerHandlers() {
    const typeInputsElements = this.element.querySelectorAll('.event__type-input');
    typeInputsElements.forEach((el) => {
      el.addEventListener('change', (event) => {
        this.#changePointType(event.target.value);
      });
    });
    this.element.querySelector('#event-destination-1').addEventListener('change', (event) => {
      this.#changePointDestination(event.target.value);
    });
  }

  #changePointType(type) {
    this.updateElement({
      point: {
        ...this._state.point,
        type,
      },
      offersArray: this.#getOffersList(type, this._state.point.offers),
    });
  }

  #changePointDestination(name) {
    this.updateElement({
      destination: this.#getDestinationByName(name),
    });
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#clickHandler);
  };

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  };

  _restoreHandlers = () => {
    // eslint-disable-next-line no-console
    console.log('Restore Handlers');
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  deleteClickHandler = () => {
    this.element.querySelector('.event__reset-btn').removeEventListener('click', this._callback.click);
    this._callback.click = null;
  };

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit();
  };
}
