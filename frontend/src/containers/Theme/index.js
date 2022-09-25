import { createTheme } from '@mui/material';

import components from './components';
import typography from './typography';

const theme = createTheme({
  spacing: 1,
  components,
  typography
});

export default theme;
