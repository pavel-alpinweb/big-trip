import ApiService from '../framework/api-service.js';

export default class DestinationsApiService extends ApiService{
  async getAllDestinations() {
    const response = await this._load({url: 'destinations'});
    return DestinationsApiService.parseResponse(response);
  }
}
