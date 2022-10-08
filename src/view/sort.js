import AbstractView from '../framework/view/abstract-view';
import {SORT_MODES} from '../utils/constants';

const createSortTemplate = () => `
<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  <div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
    <label class="trip-sort__btn" for="sort-day" data-type="${SORT_MODES.DAY}">Day</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--event">
    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
    <label class="trip-sort__btn" for="sort-event" data-disabled>Event</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--time">
    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
    <label class="trip-sort__btn" for="sort-time" data-type="${SORT_MODES.TIME}">Time</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--price">
    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
    <label class="trip-sort__btn" for="sort-price" data-type="${SORT_MODES.PRICE}">Price</label>
  </div>

  <div class="trip-sort__item  trip-sort__item--offer">
    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
    <label class="trip-sort__btn" for="sort-offer" data-disabled>Offers</label>
  </div>
</form>
`;

export default class Sort extends AbstractView{
  get template() {
    return createSortTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    const sortsElement = this.element.querySelectorAll('.trip-sort__btn');
    sortsElement.forEach((el) => {
      const type = el.dataset.type;
      if (!el.hasAttribute('data-disabled')) {
        el.addEventListener('click', () => {
          this.#clickHandler(type);
        });
      }
    });
  };

  #clickHandler = (type) => {
    this._callback.click(type);
  };
}
