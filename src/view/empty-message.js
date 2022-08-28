import {createElement} from '../render.js';

const createEmptyMessageTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EmptyMessage {
  #element = null;

  get template() {
    return createEmptyMessageTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
