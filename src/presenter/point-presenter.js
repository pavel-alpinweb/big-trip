import {render} from '../framework/render.js';
import {updatePoint} from '../mock/mock.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class PointPresenter {
  #listContainer = null;
  #pointComponent = null;
  #pontFormComponent = null;
  #eventsModel = null;
  constructor({listContainer, point, offersArray, destination, eventsModel}) {
    this.#listContainer = listContainer;
    this.#pointComponent = new Point({point, offersArray, destination});
    this.#pontFormComponent = new PointForm({point, offersArray, destination});
    this.#eventsModel = eventsModel;
  }

  replaceComponents(newComponent,oldComponent) {
    this.#listContainer.replaceChild(newComponent, oldComponent);
  }

  resetView() {
    this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
  }

  #renderPoint() {

    this.#pointComponent.setClickFavoriteHandler(() => {
      const result = updatePoint({
        ...this.#pointComponent.props.point,
        'is_favorite': !this.#pointComponent.props.point['is_favorite']
      });
      this.#eventsModel.updateCurrentPoint(result);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#pointComponent.setClickHandler(() => {
      this.replaceComponents(this.#pontFormComponent.element, this.#pointComponent.element);
      document.addEventListener('keydown', onEscKeyDown);
    });

    this.#pontFormComponent.setClickHandler(() => {
      this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
    });

    this.#pontFormComponent.setSubmitHandler(() => {
      this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
    });

    render(this.#pointComponent, this.#listContainer);
  }

  init() {
    this.#renderPoint();
  }
}
