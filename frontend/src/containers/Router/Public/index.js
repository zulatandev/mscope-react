import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '../../Components';
import { PUBLIC_ROUTES, ROUTES } from '../../../constants';

const PublicRoutes = () => (
  <Routes>
    {PUBLIC_ROUTES.map(({ path, element: C }) => (
      <Route
        key={path}
        path={path}
        element={
          <AuthLayout>
            <C />
          </AuthLayout>
        }
      />
    ))}
    <Route path="*" element={<Navigate to={ROUTES.AUTH.LOGIN} />} />
  </Routes>
);

export default PublicRoutes;
