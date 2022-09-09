import AbstractView from '../framework/view/abstract-view';

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
    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
    <input
    id="filter-future"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="future"
    ${isDisabled(props.futurePointsNumber)}>
    <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
    <input
    id="filter-past"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"
    value="past"
    ${isDisabled(props.pastPointsNumber)}>
    <label class="trip-filters__filter-label" for="filter-past">Past</label>
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
}
