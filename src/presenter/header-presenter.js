import {render, RenderPosition} from '../framework/render.js';
import TripInfo from '../view/trip-info.js';

export default class HeaderPresenter {
  init(headerContainer) {
    render(new TripInfo, headerContainer, RenderPosition.AFTERBEGIN);
  }
}
