import ApiService from '../framework/api-service.js';
// import {METHODS} from '../utils/constants.js';

export default class PointsApiService extends ApiService{
  async getAllPoints() {
    const response = await this._load({url: 'points'});
    return PointsApiService.parseResponse(response);
  }
}
