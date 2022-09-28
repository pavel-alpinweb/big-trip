import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createNewEventButtonTemplate = (state) => `
    <button
        class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
        type="button"
        ${state.isDisabled ? 'disabled' : ''}
    >
        New event
    </button>
`;

export default class NewEventButton extends AbstractStatefulView{
  constructor() {
    super();
    this._state = {
      isDisabled: false,
    };
  }

  get template() {
    return createNewEventButtonTemplate(this._state);
  }

  changeBtnState() {
    this.updateElement({
      isDisabled: !this._state.isDisabled,
    });
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  _restoreHandlers = () => {
    this.setClickHandler(this._callback.click);
  };
}
