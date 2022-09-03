import AbstractView from '../framework/view/abstract-view';

const createEmptyMessageTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EmptyMessage extends AbstractView {
  get template() {
    return createEmptyMessageTemplate();
  }
}
