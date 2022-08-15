import {createElement} from '../render.js';

const createTestComponentTemplate = () => '<h1>Test component</h1>';

export default class TestComponent {
  getTemplate() {
    return createTestComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
