import {remove, render, RenderPosition} from '../framework/render.js';
import Sort from '../view/sort.js';
import {SORT_MODES} from '../utils/constants.js';
import {getKeyByValue} from '../utils/helpers.js';


export default class SortPresenter {
  #eventsModel = null;
  #sortContainer = null;
  #clearPoints = null;
  #displayPoints = null;
  #sortedComponent = null;
  #activeSort = SORT_MODES.DAY;
  constructor({eventsModel, sortContainer, clearPoints, displayPoints}) {
    this.#eventsModel = eventsModel;
    this.#sortContainer = sortContainer;
    this.#clearPoints = clearPoints;
    this.#displayPoints = displayPoints;
  }

  init() {
    this.#sortedComponent = new Sort();
    this.#sortedComponent.setClickHandler((type) => {
      if (this.#activeSort !== SORT_MODES[getKeyByValue(SORT_MODES, type)]) {
        this.#clearPoints();
        this.#displayPoints(this.#eventsModel[type]);
        this.#activeSort = SORT_MODES[getKeyByValue(SORT_MODES, type)];
      }
    });
    if (this.#eventsModel.points.length > 0) {
      render(this.#sortedComponent, this.#sortContainer, RenderPosition.AFTERBEGIN);
    }
  }

  destroy() {
    remove(this.#sortedComponent);
  }
}
