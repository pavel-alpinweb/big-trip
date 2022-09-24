import {render} from '../framework/render.js';
import Filters from '../view/filters.js';

export default class FiltersPresenter {
  #eventsModel = null;
  #filtersContainer = null;
  #clearPoints = null;
  #displayPoints = null;
  constructor({eventsModel, filtersContainer, clearPoints, displayPoints}) {
    this.#eventsModel = eventsModel;
    this.#filtersContainer = filtersContainer;
    this.#clearPoints = clearPoints;
    this.#displayPoints = displayPoints;
  }

  init() {
    const filtersComponent = new Filters({
      allPointsNumber: this.#eventsModel.points.length,
      pastPointsNumber: this.#eventsModel.pastPoints.length,
      futurePointsNumber: this.#eventsModel.futurePoints.length,
    });
    filtersComponent.setClickHandler((type) => {
      this.#clearPoints();
      this.#displayPoints(this.#eventsModel[type]);
    });
    render(filtersComponent, this.#filtersContainer);
  }
}
