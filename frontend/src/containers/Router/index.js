import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { CircularProgress, Stack, Typography } from '@mui/material';

import PrivateRoutes from './Private';
import PublicRoutes from './Public';

import { useAppContext } from '../../context';
import api from '../../apis';
import styles from './styles';

const AppRouter = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { account, setAccount } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  if (!account) {
    api.auth
      .me()
      .then(res => {
        setAccount(res.data);
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  }

  return isLoading ? (
    <Stack sx={styles.router} spacing={10}>
      <CircularProgress />
      <Typography>MSCOPE</Typography>
    </Stack>
  ) : (
    <BrowserRouter>
      {account ? <PrivateRoutes /> : <PublicRoutes />}
    </BrowserRouter>
  );
};

export default AppRouter;
