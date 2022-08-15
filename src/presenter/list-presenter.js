import {render} from '../render.js';
import TestComponent from '../view/test-component.js';

export default class ListPresenter {
  init(listContainer) {
    render(new TestComponent, listContainer);
  }
}
