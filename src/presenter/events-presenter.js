import {render} from '../render.js';
import TestComponent from '../view/test-component.js';

export default class EventsPresenter {
  init(eventsContainer) {
    render(new TestComponent, eventsContainer);
  }
}
