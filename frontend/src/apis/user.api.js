import Http from './http';

class UserApi {
  static post = user => {
    return Http.post('/users', user);
  };

  static get = userId => {
    return Http.get(`/users/${userId}`);
  };

  static getList = query => {
    return Http.get('/users', query);
  };

  static put = (userId, user) => {
    return Http.put(`/users/${userId}`, user);
  };

  static delete = userId => {
    return Http.delete(`/users/${userId}`);
  };
}

export default UserApi;
