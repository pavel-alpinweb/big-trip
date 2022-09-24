import AbstractView from '../framework/view/abstract-view';
import {FILTERS_MODES} from '../utils/constants';

const isDisabled = (number) => number === 0 ? 'disabled' : '';

const createFiltersTemplate = (props) => `
<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
    <input
    id="filter-everything"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="everything"
    checked
    ${isDisabled(props.allPointsNumber)}>
    <label class="trip-filters__filter-label" for="filter-everything" data-type="${FILTERS_MODES.ALL}">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input
    id="filter-future"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="future"
    ${isDisabled(props.futurePointsNumber)}>
    <label class="trip-filters__filter-label" for="filter-future" data-type="${FILTERS_MODES.FUTURE}">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input
    id="filter-past"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="past"
    ${isDisabled(props.pastPointsNumber)}>
    <label class="trip-filters__filter-label" for="filter-past" data-type="${FILTERS_MODES.PAST}">Past</label>
  </div>

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;

export default class Filters extends AbstractView{
  constructor(props) {
    super();
    this.props = props;
  }

  get template() {
    return createFiltersTemplate(this.props);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    const filtersElement = this.element.querySelectorAll('.trip-filters__filter-label');
    filtersElement.forEach((el) => {
      const type = el.dataset.type;
      el.addEventListener('click', () => {
        this.#clickHandler(type);
      });
    });
  };

  #clickHandler = (type) => {
    this._callback.click(type);
  };
}
