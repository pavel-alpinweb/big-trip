import {render} from '../render.js';
import TestComponent from '../view/test-component.js';

export default class FiltersPresenter {
  init(filtersContainer) {
    render(new TestComponent, filtersContainer);
  }
}
