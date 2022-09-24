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
    const filtersComponent = new Filters({
      allPointsNumber: this.#eventsModel.points.length,
      pastPointsNumber: this.#eventsModel.pastPoints.length,
      futurePointsNumber: this.#eventsModel.futurePoints.length,
    });
    filtersComponent.setClickHandler((type) => {
      console.log('filter type', type);
    });
    render(filtersComponent, this.#filtersContainer);
  }
}
