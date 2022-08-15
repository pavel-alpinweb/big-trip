import {render} from '../render.js';
import PointForm from '../view/point-form.js';

export default class ListPresenter {
  init(listContainer) {
    render(new PointForm, listContainer);
  }
}
