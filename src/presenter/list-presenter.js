import {render} from '../render.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class ListPresenter {
  init(listContainer) {
    render(new PointForm, listContainer);
    for (let i = 0; i < 3; i++) {
      render(new Point, listContainer);
    }
  }
}
