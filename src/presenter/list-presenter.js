import {render} from '../render.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class ListPresenter {
  constructor(pointsList) {
    this.pointsList = pointsList;
  }

  init(listContainer) {
    render(new PointForm, listContainer);
    const PointClass = Point;
    for (const point of this.pointsList) {
      render(new PointClass(point), listContainer);
    }
  }
}
