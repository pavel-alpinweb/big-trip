import ApiService from '../framework/api-service.js';
// import {METHODS} from '../utils/constants.js';

export default class DestinationsApiService extends ApiService{
  async getAllDestinations() {
    return await this._load({url: '/destinations'});
  }
}
