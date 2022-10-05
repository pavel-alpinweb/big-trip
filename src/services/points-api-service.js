import ApiService from '../framework/api-service.js';
// import {METHODS} from '../utils/constants.js';

export default class PointsApiService extends ApiService{
  async getAllPoints() {
    return await this._load({url: 'points'});
  }
}
