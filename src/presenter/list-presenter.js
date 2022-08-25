import {render} from '../render.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class ListPresenter {
  constructor(eventsModel) {
    this.eventsModel = eventsModel;
  }

  init(listContainer) {
    const currentPoint = this.eventsModel.point;
    const currentOffersArray = this.eventsModel.getOffersList(currentPoint.type, currentPoint.offers);
    // eslint-disable-next-line no-console
    console.log('currentPoint', currentPoint);
    render(new PointForm({point: currentPoint, offersArray: currentOffersArray}), listContainer);
    const PointClass = Point;
    for (const point of this.eventsModel.points) {
      const offersArray = this.eventsModel.getOffersList(point.type, point.offers);
      render(new PointClass({point, offersArray}), listContainer);
    }
  }
}
