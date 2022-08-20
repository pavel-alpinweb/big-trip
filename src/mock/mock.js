export const generateDestination = () => ({
  id: 1,
  description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  name: 'Chamonix',
  pictures: [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: 'Chamonix parliament building'
    }
  ]
});

export const generateOffer = () => ({
  id: 1,
  title: 'Upgrade to a business class',
  price: 120
});

export const generateOffersByType = (type) => ({
  type,
  offers: Array.from({length: 3}, generateOffer),
});
