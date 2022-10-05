import ApiService from '../framework/api-service.js';
// import {METHODS} from '../utils/constants.js';

export default class OffersApiService extends ApiService{
  async getAllOffers() {
    return await this._load({url: '/offers'});
  }
}
