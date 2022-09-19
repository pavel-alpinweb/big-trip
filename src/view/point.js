import AbstractView from '../framework/view/abstract-view';
import {formatEventDate, formatEventTime, deferenceBetweenDays, typeName} from '../utils/helpers.js';

const isFavorite = (isFavoriteParam) => isFavoriteParam ? 'event__favorite-btn--active' : '';

const createOffersListTemplate = (offers) => `
<ul class="event__selected-offers">
    ${offers.map(({title, price}) => `
    <li class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
    </li>`).join('')}
</ul>
`;

const createPointTemplate = (props) => `
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${formatEventDate(props.point.date_from)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${props.point.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${typeName(props.point.type)} ${props.destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${formatEventTime(props.point.date_from)}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${formatEventTime(props.point.date_to)}</time>
      </p>
      <p class="event__duration">${deferenceBetweenDays(props.point.date_from, props.point.date_to)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${props.point.base_price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${createOffersListTemplate(props.offersArray)}
    <button class="event__favorite-btn ${isFavorite(props.point.is_favorite)}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`;

export default class Point extends AbstractView{
  constructor(props) {
    super();
    this.props = props;
  }

  get template() {
    return createPointTemplate(this.props);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  setClickFavoriteHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#clickFavoriteHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
