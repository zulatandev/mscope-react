import {
  ProductDetail,
  ProductList,
  Login,
  Register,
  UserDetail,
  UserList
} from '../containers/Pages';
import {ROLE} from "./role";

export const ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  DASHBOARD: '/products',
  PRODUCT: {
    LIST: '/products',
    DETAIL: '/products/:id/detail'
  },
  USER: {
    LIST: '/users',
    DETAIL: '/users/:id/detail'
  }
};

export const PUBLIC_ROUTES = [
  {
    path: ROUTES.AUTH.LOGIN,
    element: Login
  },
  {
    path: ROUTES.AUTH.REGISTER,
    element: Register
  }
];

export const PRIVATE_ROUTES = [
  {
    role: [ROLE.USER, ROLE.ADMIN],
    path: ROUTES.PRODUCT.LIST,
    element: ProductList
  },
  {
    role: [ROLE.USER, ROLE.ADMIN],
    path: ROUTES.PRODUCT.DETAIL,
    element: ProductDetail
  },
  {
    role: [ROLE.ADMIN],
    path: ROUTES.USER.LIST,
    element: UserList
  },
  {
    role: [ROLE.ADMIN],
    path: ROUTES.USER.DETAIL,
    element: UserDetail
  }
];
