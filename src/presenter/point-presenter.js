import {render} from '../framework/render.js';
import {updatePoint} from '../mock/mock.js';
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

    this.#pointComponent.setClickFavoriteHandler(() => {
      const result = updatePoint({...this.#pointComponent.props.point, 'is_favorite': !this.#pointComponent.props.point['is_favorite']});
      // eslint-disable-next-line no-console
      console.log('point', result);
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
