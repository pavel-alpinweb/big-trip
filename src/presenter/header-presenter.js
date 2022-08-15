import {render} from '../render.js';
import TestComponent from '../view/test-component.js';

export default class HeaderPresenter {
  init(headerContainer) {
    render(new TestComponent, headerContainer);
  }
}
