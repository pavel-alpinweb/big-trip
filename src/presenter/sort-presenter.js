import {render, RenderPosition} from '../framework/render.js';
import Sort from '../view/sort.js';


export default class SortPresenter {
  #eventsModel = null;
  #listContainer = null;

  constructor(eventsModel, listContainer) {
    this.#eventsModel = eventsModel;
    this.#listContainer = listContainer;
  }

  init() {
    const sortElement = new Sort();
    sortElement.setClickHandler((type) => {
      console.log('sort type', type);
    });
    if (this.#eventsModel.points.length > 0) {
      render(sortElement, this.#listContainer, RenderPosition.AFTERBEGIN);
    }
  }
}
