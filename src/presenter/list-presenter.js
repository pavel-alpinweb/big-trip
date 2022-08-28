import {render, RenderPosition} from '../render.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';
import EmptyMessage from '../view/empty-message';

export default class ListPresenter {
  #eventsModel = null;
  #listContainer = null;
  #newPoint = null;
  #currentOffersArray = [];
  constructor(eventsModel, listContainer) {
    this.#eventsModel = eventsModel;
    this.#listContainer = listContainer;
    this.#newPoint = this.#eventsModel.localPoint;
    this.#currentOffersArray = this.#eventsModel.getOffersList(this.#newPoint.type, this.#newPoint.offers);
  }

  editNewPoint() {
    render(new PointForm({point: this.#newPoint, offersArray: this.#currentOffersArray}), this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  init() {
    if (this.#eventsModel.points.length === 0) {
      render(new EmptyMessage, this.#listContainer);
    } else {
      for (const point of this.#eventsModel.points) {
        const offersArray = this.#eventsModel.getOffersList(point.type, point.offers);
        this.#renderPoint(point, offersArray);
      }
    }
  }

  #renderPoint(point, offersArray) {
    const pointComponent = new Point({point, offersArray});
    const pontFormComponent = new PointForm({point, offersArray});

    const replaceComponents = (newComponent,oldComponent) => {
      this.#listContainer.replaceChild(newComponent, oldComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceComponents(pointComponent.element, pontFormComponent.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceComponents(pontFormComponent.element, pointComponent.element);
      document.addEventListener('keydown', onEscKeyDown);
    });

    pontFormComponent.element.querySelector('.event__reset-btn').addEventListener('click', () => {
      replaceComponents(pointComponent.element, pontFormComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pontFormComponent.element.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      replaceComponents(pointComponent.element, pontFormComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listContainer);
  }
}
