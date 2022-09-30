import {render, remove} from '../framework/render.js';
import {updatePoint} from '../mock/mock.js';
import {POINT_MODES} from '../utils/constants.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class PointPresenter {
  #listContainer = null;
  #pointComponent = null;
  #pontFormComponent = null;
  #eventsModel = null;
  #resetView = null;
  #mode = POINT_MODES.DEFAULT;
  constructor({listContainer, point, offersArray, allOffers, destination, eventsModel, reset, destinationsList}) {
    this.#listContainer = listContainer;
    this.#eventsModel = eventsModel;
    this.#pointComponent = new Point({point, offersArray, destination});
    this.#pontFormComponent = new PointForm({
      props: {point, offersArray: allOffers, destination, destinationsList, isNewPoint: false},
      getOffersList: this.#eventsModel.getOffersListByIds,
      getDestinationByName: this.#eventsModel.getDestinationByName,
      getOffersListByType: this.#eventsModel.getOffersListByType,
    });
    this.#resetView = reset;
  }

  replaceComponents(newComponent,oldComponent) {
    this.#listContainer.replaceChild(newComponent, oldComponent);
  }

  resetView() {
    if (this.#mode === POINT_MODES.EDITING) {
      this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
      this.#mode = POINT_MODES.DEFAULT;
    }
  }

  #renderPoint() {

    this.#pointComponent.setClickFavoriteHandler(async () => {
      const result = await updatePoint({
        ...this.#pointComponent.props.point,
        'is_favorite': !this.#pointComponent.props.point['is_favorite']
      });
      this.#eventsModel.updateCurrentPoint(result);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#mode = POINT_MODES.DEFAULT;
        this.#pontFormComponent.resetState();
        this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this.#pointComponent.setClickHandler(() => {
      this.#resetView();
      this.#mode = POINT_MODES.EDITING;
      this.replaceComponents(this.#pontFormComponent.element, this.#pointComponent.element);
      document.addEventListener('keydown', onEscKeyDown);
    });

    this.#pontFormComponent.setCloseClickHandler(() => {
      this.#mode = POINT_MODES.DEFAULT;
      this.#pontFormComponent.resetState();
      this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this.#pontFormComponent.setDeleteClickHandler(() => {
      this.#mode = POINT_MODES.DEFAULT;
      this.#pontFormComponent.resetState();
      this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this.#pontFormComponent.setSubmitHandler(async (isNewPoint, point) => {
      if (!isNewPoint) {
        const result = await updatePoint(point);
        this.#eventsModel.updateCurrentPoint(result);
      }
      this.#mode = POINT_MODES.DEFAULT;
      this.replaceComponents(this.#pointComponent.element, this.#pontFormComponent.element);
    });

    render(this.#pointComponent, this.#listContainer);
  }

  init() {
    this.#renderPoint();
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pontFormComponent);
  }
}
