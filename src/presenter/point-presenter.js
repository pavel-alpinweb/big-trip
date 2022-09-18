import {render} from '../framework/render.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class PointPresenter {
  #listContainer = null;
  #pointComponent = null;
  #pontFormComponent = null;
  constructor({listContainer, point, offersArray, destination}) {
    this.#listContainer = listContainer;
    this.#pointComponent = new Point({point, offersArray, destination});
    this.#pontFormComponent = new PointForm({point, offersArray, destination});
  }

  #renderPoint() {
    const replaceComponents = (newComponent,oldComponent) => {
      this.#listContainer.replaceChild(newComponent, oldComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#pointComponent.setClickHandler(() => {
      replaceComponents(this.#pontFormComponent.element, this.#pointComponent.element);
      document.addEventListener('keydown', onEscKeyDown);
    });

    this.#pontFormComponent.setClickHandler(() => {
      replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
    });

    this.#pontFormComponent.setSubmitHandler(() => {
      replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
    });

    render(this.#pointComponent, this.#listContainer);
  }

  init() {
    this.#renderPoint();
  }
}
