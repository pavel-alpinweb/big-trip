export const generateDestination = () => ({
  'id': 1,
  'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  'name': 'Chamonix',
  'pictures': [
    {
      'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
      'description': 'Chamonix parliament building'
    }
  ]
});

export const generateOffer = () => ({
  'id': 1,
  'title': 'Upgrade to a business class',
  'price': 120
});

export const generateOffersByType = (type) => ({
  type,
  'offers': Array.from({length: 3}, generateOffer),
});

export const generatePoint = () => ({
  'base_price': 1100,
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'destination': null,
  'id': '0',
  'is_favorite': false,
  'offers': [1, 2, 4],
  'type': 'bus'
});
