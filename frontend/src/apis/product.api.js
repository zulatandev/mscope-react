import Http from './http';

class ProductApi {
  static post = card => {
    return Http.post('/cards', card);
  };

  static get = cardId => {
    return Http.get(`/cards/${cardId}`);
  };

  static getList = query => {
    return Http.get('/cards', query);
  };

  static put = (cardId, card) => {
    return Http.put(`/cards/${cardId}`, card);
  };

  static delete = cardId => {
    return Http.delete(`/cards/${cardId}`);
  };
}

export default ProductApi;
