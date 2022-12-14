import AbstractView from '../framework/view/abstract-view';

const createTripInfoTemplate = (props) => `
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${props.pointsNames}</h1>

    <p class="trip-info__dates">${props.tripDuring}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${props.totalPrice}</span>
  </p>
</section>
`;

export default class TripInfo extends AbstractView{
  constructor(props) {
    super();
    this.props = props;
  }

  get template() {
    return createTripInfoTemplate(this.props);
  }
}
