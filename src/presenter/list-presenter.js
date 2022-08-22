import {render} from '../render.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class ListPresenter {
  constructor(eventsModel) {
    this.eventsModel = eventsModel;
  }

  init(listContainer) {
    render(new PointForm, listContainer);
    const PointClass = Point;
    for (const point of this.eventsModel.points) {
      const offersArray = this.eventsModel.getOffersList(point.type, point.offers);
      render(new PointClass({point, offersArray}), listContainer);
    }
  }
}
