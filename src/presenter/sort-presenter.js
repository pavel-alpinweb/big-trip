import {render, RenderPosition} from '../framework/render.js';
import Sort from '../view/sort.js';


export default class SortPresenter {
  #eventsModel = null;
  #sortContainer = null;
  #clearPoints = null;
  #displayPoints = null;
  constructor({eventsModel, sortContainer, clearPoints, displayPoints}) {
    this.#eventsModel = eventsModel;
    this.#sortContainer = sortContainer;
    this.#clearPoints = clearPoints;
    this.#displayPoints = displayPoints;
  }

  init() {
    const sortElement = new Sort();
    sortElement.setClickHandler((type) => {
      this.#clearPoints();
      this.#displayPoints(this.#eventsModel[type]);
    });
    if (this.#eventsModel.points.length > 0) {
      render(sortElement, this.#sortContainer, RenderPosition.AFTERBEGIN);
    }
  }
}
