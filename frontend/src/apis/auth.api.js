import Http from './http';

class AuthApi {
  static login = account => {
    return Http.post('/auth/login', account);
  };

  static register = account => {
    return Http.post('/auth/register', account);
  };

  static me = () => {
    return Http.get(`/auth/me`);
  };
}

export default AuthApi;
