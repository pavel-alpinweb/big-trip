import {render, remove} from '../framework/render.js';
import {POINT_MODES, UI_UPDATE_TYPES} from '../utils/constants.js';
import PointForm from '../view/point-form.js';
import Point from '../view/point.js';

export default class PointPresenter {
  #listContainer = null;
  #pointComponent = null;
  #pontFormComponent = null;
  #eventsModel = null;
  #resetView = null;
  #mode = POINT_MODES.DEFAULT;
  #point = null;
  #offersArray = null;
  #allOffers = null;
  #destination = null;
  #destinationsList = null;
  #pointsService = null;
  #uiBlocker = null;
  constructor({
    listContainer,
    point,
    offersArray,
    allOffers,
    destination,
    eventsModel,
    reset,
    destinationsList,
    pointsService,
    uiBlocker,
  }) {
    this.#listContainer = listContainer;
    this.#eventsModel = eventsModel;
    this.#point = point;
    this.#offersArray = offersArray;
    this.#allOffers = allOffers;
    this.#destination = destination;
    this.#destinationsList = destinationsList;
    this.#resetView = reset;
    this.#pointsService = pointsService;
    this.#uiBlocker = uiBlocker;
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

  #initPoint() {

    this.#pointComponent.setClickFavoriteHandler(async () => {
      this.#uiBlocker.block();
      const result = await this.#pointsService.updatePoint({
        ...this.#pointComponent.props.point,
        'is_favorite': !this.#pointComponent.props.point['is_favorite']
      });
      this.#uiBlocker.unblock();
      this.#eventsModel.updateCurrentPoint(UI_UPDATE_TYPES.POINT, result);
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

    this.#pontFormComponent.setDeleteClickHandler(async () => {
      this.#mode = POINT_MODES.DEFAULT;
      const id = this.#pontFormComponent.props.point.id;
      this.#uiBlocker.block();
      await this.#pointsService.deletePoints(this.#pontFormComponent.props.point.id);
      this.#uiBlocker.unblock();
      this.#eventsModel.deleteCurrentPoint(id);
      this.#pontFormComponent.resetState();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this.#pontFormComponent.setSubmitHandler(async (isNewPoint, point) => {
      if (!isNewPoint) {
        this.#uiBlocker.block();
        const result = await this.#pointsService.updatePoint(point);
        this.#uiBlocker.unblock();
        this.#eventsModel.updateCurrentPoint(UI_UPDATE_TYPES.ALL, result);
      }
      this.#mode = POINT_MODES.DEFAULT;
    });
  }

  init(point = this.#point) {
    const prevPointComponent = this.#pointComponent;
    const prevPontFormComponent = this.#pontFormComponent;
    this.#pointComponent = new Point({
      point,
      offersArray: this.#offersArray,
      destination: this.#destination
    });
    this.#pontFormComponent = new PointForm({
      props: {
        point: this.#point,
        offersArray: this.#allOffers,
        destination: this.#destination,
        destinationsList: this.#destinationsList,
        isNewPoint: false
      },
      getOffersList: this.#eventsModel.getOffersListByIds,
      getDestinationByName: this.#eventsModel.getDestinationByName,
      getOffersListByType: this.#eventsModel.getOffersListByType,
    });
    this.#initPoint();
    if (prevPointComponent === null || prevPontFormComponent === null) {
      render(this.#pointComponent, this.#listContainer);
    } else {
      this.replaceComponents(this.#pointComponent.element, prevPointComponent.element);
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pontFormComponent);
  }
}
