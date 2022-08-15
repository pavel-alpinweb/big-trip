import {render, RenderPosition} from '../render.js';
import Sort from '../view/sort.js';

export default class EventsPresenter {
  init(eventsContainer) {
    render(new Sort, eventsContainer, RenderPosition.AFTERBEGIN);
  }
}
