import {render, RenderPosition} from '../render.js';
import Sort from '../view/sort.js';


export default class SortPresenter {
  #eventsModel = null;
  #listContainer = null;

  constructor(eventsModel, listContainer) {
    this.#eventsModel = eventsModel;
    this.#listContainer = listContainer;
  }

  init() {
    if (this.#eventsModel.points.length > 0) {
      render(new Sort, this.#listContainer, RenderPosition.AFTERBEGIN);
    }
  }
}
