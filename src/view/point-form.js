import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {typeName, formatEventDateTime} from '../utils/helpers.js';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import 'flatpickr/dist/flatpickr.min.css';

const isChecked = (id, offersIds) => offersIds.includes(id) ? 'checked' : '';

const isEventChecked = (value, type) => value === type ? 'checked' : '';

const createOffersListTemplate = (offers, offersIds) => {
  if (offers.length <= 0) {return '';}
  else {return `
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offers.map(({id, title, price}) => `
        <div class="event__offer-selector">
            <input
                class="event__offer-checkbox  visually-hidden"
                id="event-offer-luggage-${id}"
                type="checkbox"
                name="event-offer-luggage"
                value="${id}"
                ${isChecked(id, offersIds)}
            >
            <label class="event__offer-label" for="event-offer-luggage-${id}">
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

const createDeleteBtnTemplate = (isNewPoint) => isNewPoint ? '' : '<button class="event__reset-btn" data-delete-btn type="reset">Delete</button>';

const createCancelBtnTemplate = (isNewPoint) => isNewPoint ? '<button class="event__reset-btn" data-cancel-btn type="reset">Cancel</button>' : '';

const createRollUpTemplate = (isNewPoint) => isNewPoint ? '' : `
      <button class="event__rollup-btn" type="button" data-close-btn>
        <span class="visually-hidden">Open event</span>
      </button>`;

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
              <input
                id="event-type-taxi-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="taxi"
                ${isEventChecked('taxi', props.point.type)}
              >
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input
                id="event-type-bus-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="bus"
                ${isEventChecked('bus', props.point.type)}
              >
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input
                id="event-type-train-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="train"
                ${isEventChecked('train', props.point.type)}
              >
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input
                id="event-type-ship-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="ship"
                ${isEventChecked('ship', props.point.type)}
              >
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input
                id="event-type-drive-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="drive"
                ${isEventChecked('drive', props.point.type)}
              >
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input
                id="event-type-flight-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="flight"
                ${isEventChecked('flight', props.point.type)}
              >
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input
                id="event-type-check-in-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="check-in"
                ${isEventChecked('check-in', props.point.type)}
              >
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input
                id="event-type-sightseeing-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="sightseeing"
                ${isEventChecked('sightseeing', props.point.type)}
              >
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input
                id="event-type-restaurant-1"
                class="event__type-input  visually-hidden"
                type="radio"
                name="event-type"
                value="restaurant"
                ${isEventChecked('restaurant', props.point.type)}
              >
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
        <label class="visually-hidden" for="event-start-time-${props.point.id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${props.point.id}" type="text" name="event-start-time" value="${formatEventDateTime(props.point.date_from)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${props.point.id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${props.point.id}" type="text" name="event-end-time" value="${formatEventDateTime(props.point.date_to)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${props.point.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${props.point.id}" type="number" name="event-price" value="${props.point.base_price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      ${createDeleteBtnTemplate(props.isNewPoint)}
      ${createCancelBtnTemplate(props.isNewPoint)}
      ${createRollUpTemplate(props.isNewPoint)}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">

        ${createOffersListTemplate(props.offersArray, props.point.offers)}
      </section>

      ${createDestinationTemplate(props.destination)}
    </section>
  </form>
</li>
`;

export default class PointForm extends AbstractStatefulView{
  #getOffersList = null;
  #getDestinationByName = null;
  #getOffersListByType = null;
  #fromDatepicker = null;
  #toDatepicker = null;

  constructor({props, getOffersList, getDestinationByName, getOffersListByType}) {
    super();
    this.props = props;
    this._state = {...this.props};
    this.#setInnerHandlers();
    this.#getOffersList = getOffersList;
    this.#getDestinationByName = getDestinationByName;
    this.#getOffersListByType = getOffersListByType;
    this.#setDatepicker();
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
    this.element.querySelector(`#event-price-${this.props.point.id}`).addEventListener('input', (event) => {
      this.#changePointPrice(event.target.value);
    });
    const inputCheckBoxes = this.element.querySelectorAll('.event__offer-checkbox');
    inputCheckBoxes.forEach((el) => {
      el.addEventListener('change', (event) => {
        this.#changePointOffersList(event.target.value);
      });
    });
  }

  #setDatepicker = () => {
    this.#fromDatepicker = flatpickr(
      this.element.querySelector(`#event-start-time-${this.props.point.id}`),
      {
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        enableTime: true,
        defaultDate: new Date(this._state.point.date_from),
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#toDatepicker = flatpickr(
      this.element.querySelector(`#event-end-time-${this.props.point.id}`),
      {
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        enableTime: true,
        defaultDate: new Date(this._state.point.date_to),
        onChange: this.#dateToChangeHandler,
      },
    );
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        'date_from': userDate,
      }
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    let resultDate = this._state.point.date_from;
    const isValidDate = dayjs(userDate).diff(resultDate, 'd') > 0;
    if (isValidDate) {resultDate = userDate;}
    this.updateElement({
      point: {
        ...this._state.point,
        'date_to': resultDate,
      }
    });
  };

  removeElement = () => {
    super.removeElement();

    if (this.#fromDatepicker) {
      this.#fromDatepicker.destroy();
      this.#fromDatepicker = null;
    }
    if (this.#toDatepicker) {
      this.#toDatepicker.destroy();
      this.#toDatepicker = null;
    }
  };

  #changePointType(type) {
    this.updateElement({
      point: {
        ...this._state.point,
        offers: [],
        type,
      },
      offersArray: this.#getOffersListByType(type),
    });
  }

  #changePointPrice(price) {
    let resultPrice = Number(price);
    if (resultPrice < 0) {
      resultPrice = 1;
    } else {
      resultPrice = Math.floor(resultPrice);
    }
    this._setState({
      point: {
        ...this._state.point,
        'base_price': resultPrice,
      },
    });
  }

  #changePointOffersList(id) {
    const idIndex = this._state.point.offers.indexOf(Number(id));
    const offersArray = [...this._state.point.offers];
    if (idIndex > -1) {
      offersArray.splice(idIndex, 1);
    } else {
      offersArray.push(Number(id));
    }
    this._setState({
      point: {
        ...this._state.point,
        offers: offersArray,
      },
    });
  }

  #changePointDestination(name) {
    this.updateElement({
      point: {
        ...this._state.point,
        destination: this.#getDestinationByName(name).id,
      },
      destination: this.#getDestinationByName(name),
    });
  }

  resetState() {
    this.updateElement({...this.props});
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    if (this.props.isNewPoint) {
      this.element.querySelector('[data-cancel-btn]').addEventListener('click', this.#clickCloseHandler);
    } else {
      this.element.querySelector('[data-close-btn]').addEventListener('click', this.#clickCloseHandler);
    }
  };

  setDeleteClickHandler = (callback) => {
    if (!this.props.isNewPoint) {
      this._callback.closeDeleteClick = callback;
      this.element.querySelector('[data-delete-btn]').addEventListener('click', this.#clickDeleteHandler);
    }
  };

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', (event) => {
      this.#submitHandler(event, this.props.isNewPoint, this._state.point);
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setDeleteClickHandler(this._callback.closeDeleteClick);
    this.setSubmitHandler(this._callback.submit);
  };

  #clickCloseHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  #clickDeleteHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeDeleteClick();
  };

  deleteClickHandler = () => {
    this.element.querySelector('.event__reset-btn').removeEventListener('click', this._callback.closeClick);
    this._callback.closeClick = null;
  };

  #submitHandler = (event, isNewPoint, point) => {
    event.preventDefault();
    this._callback.submit(isNewPoint, point);
  };
}
