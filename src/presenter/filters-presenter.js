import {render} from '../framework/render.js';
import Filters from '../view/filters.js';

export default class FiltersPresenter {
  init(filtersContainer) {
    render(new Filters, filtersContainer);
  }
}
