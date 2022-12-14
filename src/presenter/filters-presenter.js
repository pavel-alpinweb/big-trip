import {render, remove} from '../framework/render.js';
import Filters from '../view/filters.js';
import {FILTERS_MODES} from '../utils/constants.js';
import {getKeyByValue} from '../utils/helpers.js';

export default class FiltersPresenter {
  #eventsModel = null;
  #filtersContainer = null;
  #clearPoints = null;
  #displayPoints = null;
  #filtersComponent = null;
  #activeFilter = FILTERS_MODES.ALL;
  constructor({eventsModel, filtersContainer, clearPoints, displayPoints}) {
    this.#eventsModel = eventsModel;
    this.#filtersContainer = filtersContainer;
    this.#clearPoints = clearPoints;
    this.#displayPoints = displayPoints;
  }

  init() {
    this.#filtersComponent = new Filters({
      allPointsNumber: this.#eventsModel.points.length,
      pastPointsNumber: this.#eventsModel.pastPoints.length,
      futurePointsNumber: this.#eventsModel.futurePoints.length,
    });
    this.#filtersComponent.setClickHandler((type) => {
      if (this.#activeFilter !== FILTERS_MODES[getKeyByValue(FILTERS_MODES, type)]) {
        this.#clearPoints();
        this.#displayPoints(this.#eventsModel[type]);
        this.#activeFilter = FILTERS_MODES[getKeyByValue(FILTERS_MODES, type)];
      }
    });
    render(this.#filtersComponent, this.#filtersContainer);
  }

  destroy() {
    remove(this.#filtersComponent);
  }
}
