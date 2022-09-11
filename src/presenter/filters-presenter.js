import {render} from '../framework/render.js';
import Filters from '../view/filters.js';

export default class FiltersPresenter {
  #eventsModel = null;
  #filtersContainer = null;
  constructor(eventsModel, filtersContainer) {
    this.#eventsModel = eventsModel;
    this.#filtersContainer = filtersContainer;
  }

  init() {
    render(new Filters({
      allPointsNumber: this.#eventsModel.points.length,
      pastPointsNumber: this.#eventsModel.pastPoints.length,
      futurePointsNumber: this.#eventsModel.futurePoints.length,
    }), this.#filtersContainer);
  }
}
