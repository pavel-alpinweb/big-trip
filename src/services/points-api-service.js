import ApiService from '../framework/api-service.js';
import {METHODS} from '../utils/constants.js';

export default class PointsApiService extends ApiService{
  async getAllPoints() {
    const response = await this._load({url: 'points'});
    return PointsApiService.parseResponse(response);
  }

  async createPoint(point) {
    const response = await this._load({
      url: 'points',
      body: JSON.stringify(point),
      method: METHODS.POST,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return PointsApiService.parseResponse(response);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      body: JSON.stringify(point),
      method: METHODS.PUT,
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return PointsApiService.parseResponse(response);
  }
}
