import { Navigate, Route, Routes } from 'react-router-dom';

import { FullLayout } from '../../Components';
import { PRIVATE_ROUTES, ROUTES } from '../../../constants';
import {useAppContext} from "../../../context";

const PrivateRoutes = () => {
  const { account } = useAppContext();

  return (
    <Routes>
      {PRIVATE_ROUTES.filter(({role}) => role.includes(account.role)).map(({path, element: C}) => (
        <Route
          key={path}
          path={path}
          element={
            <FullLayout>
              <C/>
            </FullLayout>
          }
        />
      ))}
      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD}/>}/>
    </Routes>
  );
};

export default PrivateRoutes;
