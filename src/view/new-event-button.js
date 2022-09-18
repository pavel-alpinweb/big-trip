import AbstractView from '../framework/view/abstract-view';

const createNewEventButtonTemplate = () => `
<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
`;

export default class NewEventButton extends AbstractView{
  constructor() {
    super();
  }

  get template() {
    return createNewEventButtonTemplate();
  }
}
