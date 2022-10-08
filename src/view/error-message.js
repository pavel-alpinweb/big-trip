import AbstractView from '../framework/view/abstract-view';

const createEmptyMessageTemplate = () => '<p class="trip-events__msg">Loading failed :(</p>';

export default class ErrorMessage extends AbstractView {
  get template() {
    return createEmptyMessageTemplate();
  }
}
